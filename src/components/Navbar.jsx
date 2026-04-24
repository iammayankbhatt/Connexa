import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  Compass,
  MessageCircle,
  User
} from 'lucide-react';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="option">
        <h1 className="connexa">Connexa</h1>

        <Link className="text" to="/feed">
          <Home className="icon" />
          <span>Feed</span>
        </Link>

        <Link className="text" to="/Match">
          <Users className="icon" />
          <span>Match</span>
        </Link>

        <Link className="text" to="/feed">
          <Compass className="icon" />
          <span>Discover</span>
        </Link>

        <Link className="text" to="/feed">
          <MessageCircle className="icon" />
          <span>Chat</span>
        </Link>

        <Link className="text" to="/feed">
          <User className="icon" />
          <span>Profile</span>
        </Link>
      </div>

      <div>
        <input type="text" />
      </div>
    </div>
  );
};

export default Navbar;