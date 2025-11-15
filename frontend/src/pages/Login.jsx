import React, { useState } from 'react';
import api from '../utils/api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      saveToken(res.data.token);
      nav('/admin');
    } catch (error) {
      setErr(error?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input name="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} type="email" required/>
        <label>Password</label>
        <input name="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} type="password" required/>
        <button className="btn" type="submit">Login</button>
      </form>
      {err && <div className="error">{err}</div>}
    </div>
  );
}
