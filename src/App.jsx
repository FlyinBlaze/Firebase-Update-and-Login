import './App.css';
import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Article from './pages/Article'
import FormArticle from './pages/FormArticle'
import Login from './pages/Login'

function RequireAuth({ children }) {
  const isLoggedIn = !!localStorage.getItem('user');
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('user'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Only show login page and nothing else if not logged in
  if (!isLoggedIn) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  // If logged in, show the full app
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/new">New Article</NavLink>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
          <Route path="/contact" element={<RequireAuth><Contact /></RequireAuth>} />
          <Route path="/articles/:urlId" element={<RequireAuth><Article /></RequireAuth>} />
          <Route path="/new" element={<RequireAuth><FormArticle /></RequireAuth>} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
