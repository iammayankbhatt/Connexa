import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Feed from './pages/feed/Feed';
import Match from './pages/match/Match';
import Discover from './pages/discover/Discover';
import Chats from './pages/chat/Chats';
import Profile from './pages/profile/Profile';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/match" element={<Match />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/chat" element={<Chats />} />
          <Route path="/chat/:chatId" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
