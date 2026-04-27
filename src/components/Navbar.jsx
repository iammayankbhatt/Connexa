import React from 'react';
import '../styles/navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Compass, MessageCircle, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="navbar">
      <div className="option">
        <h1 className="connexa">Connexa</h1>
        <Link className={`text ${isActive('/feed') ? 'nav-active' : ''}`} to="/feed">
          <Home className="icon" />
          <span>Feed</span>
        </Link>
        <Link className={`text ${isActive('/match') ? 'nav-active' : ''}`} to="/match">
          <Users className="icon" />
          <span>Match</span>
        </Link>
        <Link className={`text ${isActive('/discover') ? 'nav-active' : ''}`} to="/discover">
          <Compass className="icon" />
          <span>Discover</span>
        </Link>
        <Link className={`text ${isActive('/chat') ? 'nav-active' : ''}`} to="/chat">
          <MessageCircle className="icon" />
          <span>Chat</span>
        </Link>
        <Link className={`text ${isActive('/profile') ? 'nav-active' : ''}`} to="/profile">
          <User className="icon" />
          <span>Profile</span>
        </Link>
      </div>
      <div className="navbar-right">
        <input type="text" placeholder="Search..." className="navbar-search" />
      </div>
    </div>
  );
};

export default Navbar;
