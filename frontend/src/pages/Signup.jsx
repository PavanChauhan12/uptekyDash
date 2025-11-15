import React, { useState } from 'react';
import api from '../utils/api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', form);
      saveToken(res.data.token);
      nav('/admin');
    } catch (error) {
      setErr(error?.response?.data?.error || error?.response?.data?.errors?.map(e=>e.msg).join(', ') || 'Signup failed');
    }
  };

  return (
    <div className="card">
      <h2>Signup (Admin)</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
        <label>Email</label>
        <input name="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} type="email" required/>
        <label>Password</label>
        <input name="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} type="password" required/>
        <button className="btn" type="submit">Create account</button>
      </form>
      {err && <div className="error">{err}</div>}
    </div>
  );
}
