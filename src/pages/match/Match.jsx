import React, { useEffect, useState } from 'react';
import '../../styles/match.css';
import { getMatchSuggestions } from '../../services/matchService';
import { sendConnectionRequest, getRelationshipStatus, acceptConnection } from '../../services/connectionService';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Check, Clock, Users } from 'lucide-react';

const MatchCard = ({ user }) => {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getRelationshipStatus(user.uid).then(setStatus);
  }, [user.uid]);

  const handleConnect = async () => {
    if (status === 'received') {
      await acceptConnection(user.uid);
      setStatus('connected');
    } else {
      await sendConnectionRequest(user.uid);
      setStatus('sent');
    }
  };

  const btnLabel = {
    none: 'Connect',
    sent: 'Request Sent',
    received: 'Accept',
    connected: 'Connected',
    loading: '...',
  }[status];

  const btnIcon = {
    none: <UserPlus size={16} />,
    sent: <Clock size={16} />,
    received: <Check size={16} />,
    connected: <Check size={16} />,
    loading: null,
  }[status];

  return (
    <div className="match-card card">
      <div className="match-avatar">{user.name?.charAt(0)?.toUpperCase() || '?'}</div>
      <h3 className="match-name">{user.name}</h3>
      <p className="match-uni">{user.university}</p>
      {user.major && <p className="match-major">{user.major}</p>}
      {user.bio && <p className="match-bio">"{user.bio}"</p>}

      {user.sharedSkills?.length > 0 && (
        <div className="match-shared">
          <p className="match-shared-label">Shared skills:</p>
          <div className="match-skills">
            {user.sharedSkills.map(s => (
              <span key={s} className="skill-badge">{s}</span>
            ))}
          </div>
        </div>
      )}

      {user.skills?.length > 0 && user.sharedSkills?.length === 0 && (
        <div className="match-skills" style={{ marginTop: '8px' }}>
          {user.skills.slice(0, 4).map(s => (
            <span key={s} className="skill-badge">{s}</span>
          ))}
        </div>
      )}

      <button
        className={`connect-btn ${status === 'connected' ? 'connected' : status === 'sent' ? 'sent' : ''}`}
        onClick={handleConnect}
        disabled={status === 'connected' || status === 'sent' || status === 'loading'}
      >
        {btnIcon}
        <span>{btnLabel}</span>
      </button>
    </div>
  );
};

const Match = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    getMatchSuggestions().then(data => {
      setSuggestions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="match-container">
      <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>Finding your matches...</p>
    </div>
  );

  return (
    <div className="match-container">
      <div className="match-header">
        <Users size={24} />
        <h2>Student Matches</h2>
      </div>
      <p className="match-subtitle">
        Discover peers who share your interests, skills, and academic goals.
      </p>

      {suggestions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          <p>No suggestions yet. More students will appear as they join Connexa!</p>
        </div>
      ) : (
        <div className="match-grid">
          {suggestions.map(user => (
            <MatchCard key={user.uid} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Match;

