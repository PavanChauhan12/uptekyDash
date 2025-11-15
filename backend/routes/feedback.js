const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateJWT } = require('../middleware/auth');
const Feedback = require('../models/Feedback');
const { stringify } = require('csv-stringify/sync'); // sync for simplicity

// Public: submit feedback
router.post('/',
  body('name').trim().notEmpty().withMessage('Name required'),
  body('message').trim().notEmpty().withMessage('Message required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating 1-5 required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, message, rating } = req.body;
    try {
      const fb = new Feedback({ name, email: email || undefined, message, rating });
      await fb.save();
      res.json({
        id: fb._id,
        name: fb.name,
        email: fb.email || null,
        message: fb.message,
        rating: fb.rating,
        createdAt: fb.createdAt
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Protected: fetch feedbacks with optional filters & pagination
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const {
      q,
      rating,
      minRating,
      maxRating,
      page = 1,
      limit = 50,
      sort = 'desc' // desc by createdAt
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(200, parseInt(limit, 10) || 50);
    const skip = (pageNum - 1) * lim;

    const filter = {};

    if (q) {
      // text search uses the text index
      filter.$text = { $search: q };
    }

    if (rating) {
      filter.rating = parseInt(rating, 10);
    } else {
      if (minRating) filter.rating = Object.assign({}, filter.rating, { $gte: parseInt(minRating, 10) });
      if (maxRating) filter.rating = Object.assign({}, filter.rating, { $lte: parseInt(maxRating, 10) });
    }

    const sortObj = sort === 'asc' ? { createdAt: 1 } : { createdAt: -1 };

    const [total, rows] = await Promise.all([
      Feedback.countDocuments(filter),
      Feedback.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(lim)
        .lean()
    ]);

    // map to API shape
    const data = rows.map(r => ({
      id: r._id,
      name: r.name,
      email: r.email || null,
      message: r.message,
      rating: r.rating,
      createdAt: r.createdAt
    }));

    res.json({ total, page: pageNum, limit: lim, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected: export CSV for matching filters
router.get('/export.csv', authenticateJWT, async (req, res) => {
  try {
    const { q, rating, minRating, maxRating, sort = 'desc' } = req.query;
    const filter = {};

    if (q) filter.$text = { $search: q };
    if (rating) filter.rating = parseInt(rating, 10);
    else {
      if (minRating) filter.rating = Object.assign({}, filter.rating, { $gte: parseInt(minRating, 10) });
      if (maxRating) filter.rating = Object.assign({}, filter.rating, { $lte: parseInt(maxRating, 10) });
    }

    const sortObj = sort === 'asc' ? { createdAt: 1 } : { createdAt: -1 };

    const rows = await Feedback.find(filter).sort(sortObj).lean();

    const header = ['id', 'name', 'email', 'message', 'rating', 'createdAt'];
    const records = rows.map(r => [String(r._id), r.name, r.email || '', r.message, r.rating, r.createdAt.toISOString()]);

    const csv = stringify([header, ...records]);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="feedbacks.csv"');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
