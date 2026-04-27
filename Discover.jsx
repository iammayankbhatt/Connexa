import React, { useEffect, useState } from 'react';
import '../../styles/discover.css';
import { getAllUsers } from '../../services/userService';
import { sendConnectionRequest, getRelationshipStatus, acceptConnection } from '../../services/connectionService';
import { useAuth } from '../../context/AuthContext';
import { Search, Compass, UserPlus, Check, Clock } from 'lucide-react';

const UserCard = ({ user }) => {
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

  return (
    <div className="discover-card card">
      <div className="discover-avatar">{user.name?.charAt(0)?.toUpperCase() || '?'}</div>
      <div className="discover-info">
        <h3>{user.name}</h3>
        <p className="discover-uni">🎓 {user.university}</p>
        {user.major && <p className="discover-major">📚 {user.major}</p>}
        {user.bio && <p className="discover-bio">{user.bio}</p>}
        {user.skills?.length > 0 && (
          <div className="discover-skills">
            {user.skills.slice(0, 5).map(s => (
              <span key={s} className="skill-badge">{s}</span>
            ))}
          </div>
        )}
      </div>
      <button
        className={`connect-btn-sm ${status === 'connected' ? 'connected' : status === 'sent' ? 'sent' : ''}`}
        onClick={handleConnect}
        disabled={status === 'connected' || status === 'sent' || status === 'loading'}
      >
        {status === 'connected' ? <Check size={14} /> : status === 'sent' ? <Clock size={14} /> : <UserPlus size={14} />}
        {status === 'none' ? 'Connect' : status === 'sent' ? 'Sent' : status === 'received' ? 'Accept' : status === 'connected' ? 'Connected' : '...'}
      </button>
    </div>
  );
};

const Discover = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getAllUsers().then(all => {
      const others = all.filter(u => u.uid !== user.uid);
      setUsers(others);
      setFiltered(others);
      setLoading(false);
    });
  }, [user.uid]);

  useEffect(() => {
    const q = search.toLowerCase();
    if (!q) { setFiltered(users); return; }
    setFiltered(users.filter(u =>
      u.name?.toLowerCase().includes(q) ||
      u.university?.toLowerCase().includes(q) ||
      u.major?.toLowerCase().includes(q) ||
      u.skills?.some(s => s.toLowerCase().includes(q))
    ));
  }, [search, users]);

  return (
    <div className="discover-container">
      <div className="discover-header">
        <Compass size={24} />
        <h2>Discover Students</h2>
      </div>
      <p className="discover-subtitle">Find students from universities, search by skill or major.</p>

      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search by name, university, skill..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading students...</p>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          <p>No students found{search ? ` for "${search}"` : ''}.</p>
        </div>
      ) : (
        <div className="discover-list">
          {filtered.map(u => <UserCard key={u.uid} user={u} />)}
        </div>
      )}
    </div>
  );
};

export default Discover;
