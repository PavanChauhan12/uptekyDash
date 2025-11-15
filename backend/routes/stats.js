const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const Feedback = require('../models/Feedback');

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const total = await Feedback.countDocuments();
    const agg = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          positive: { $sum: { $cond: [{ $gte: ['$rating', 4] }, 1, 0] } },
          negative: { $sum: { $cond: [{ $lte: ['$rating', 2] }, 1, 0] } }
        }
      }
    ]);

    const byRating = await Feedback.aggregate([
      { $group: { _id: '$rating', cnt: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    const avgRating = agg[0] ? agg[0].avgRating : 0;
    const positive = agg[0] ? agg[0].positive : 0;
    const negative = agg[0] ? agg[0].negative : 0;

    res.json({
      total,
      avgRating: Number(avgRating).toFixed(2),
      positive,
      negative,
      byRating: byRating.map(b => ({ rating: b._id, count: b.cnt }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
