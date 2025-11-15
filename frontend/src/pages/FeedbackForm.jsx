import React, { useState } from 'react';
import api from '../utils/api';

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 5 });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await api.post('/feedback', form);
      setStatus('Thanks! Your feedback was submitted.');
      setForm({ name: '', email: '', message: '', rating: 5 });
    } catch (err) {
      console.error(err);
      setStatus(err?.response?.data?.error || 'Submit failed');
    }
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <div className="card">
      <h2>Submit Feedback</h2>
      <form onSubmit={submit}>
        <label>Name (required)</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email (optional)</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" />
        <label>Message (required)</label>
        <textarea name="message" value={form.message} onChange={handleChange} required />
        <label>Rating</label>
        <select name="rating" value={form.rating} onChange={handleChange}>
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button className="btn" type="submit">Send Feedback</button>
      </form>
      {status && <div className="status">{status}</div>}
    </div>
  );
}
