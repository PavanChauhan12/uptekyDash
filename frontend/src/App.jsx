import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './pages/FeedbackForm';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { isLoggedIn, logout } from './utils/auth';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">Feedback Dashboard</Link>
        <nav>
          <Link to="/">Submit</Link>
          {isLoggedIn() ? (
            <>
              <Link to="/admin">Dashboard</Link>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}
