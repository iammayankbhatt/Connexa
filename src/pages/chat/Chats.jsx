import React, { useEffect, useState, useRef } from 'react';
import '../../styles/chat.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserChats, subscribeMessages, sendMessage, getOrCreateChat } from '../../services/chatService';
import { getMyConnections } from '../../services/connectionService';
import { getUserProfile } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { Send, ArrowLeft, MessageSquare } from 'lucide-react';

const Chats = () => {
  const { chatId } = useParams();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [chatProfiles, setChatProfiles] = useState({});
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msgText, setMsgText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [userChats, connectedUids] = await Promise.all([
        getUserChats(user.uid),
        getMyConnections(user.uid),
      ]);
      setChats(userChats);

      const allUids = new Set();
      userChats.forEach(c => c.participants.forEach(p => p !== user.uid && allUids.add(p)));
      connectedUids.forEach(uid => allUids.add(uid));

      const profiles = {};
      await Promise.all([...allUids].map(async uid => {
        profiles[uid] = await getUserProfile(uid);
      }));
      setChatProfiles(profiles);

      setConnections(connectedUids.filter(uid =>
        !userChats.some(c => c.participants.includes(uid))
      ));
      setLoading(false);
    }
    load();
  }, [user.uid, chatId]);

  useEffect(() => {
    if (!chatId) return;
    const unsub = subscribeMessages(chatId, msgs => {
      setMessages(msgs);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    return unsub;
  }, [chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!msgText.trim() || !chatId) return;
    setSending(true);
    try {
      await sendMessage(chatId, user.uid, msgText.trim());
      setMsgText('');
    } catch (err) {
      alert('Failed to send');
    } finally {
      setSending(false);
    }
  };

  const openChat = async (uid) => {
    const id = await getOrCreateChat(user.uid, uid);
    navigate(`/chat/${id}`);
  };

  const activeChat = chats.find(c => c.id === chatId);
  const otherUid = activeChat?.participants.find(p => p !== user.uid);
  const otherProfile = otherUid ? chatProfiles[otherUid] : null;

  const formatTime = (ts) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    const diff = Math.floor((Date.now() - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const myAvatar = profile?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <div className={`chat-sidebar ${chatId ? 'hide-mobile' : ''}`}>
        <div className="chat-sidebar-header">
          <h2>Messages</h2>
        </div>
        <div className="chat-sidebar-list">
          {loading ? (
            <p className="chat-loading">Loading chats...</p>
          ) : (
            <>
              {chats.map(chat => {
                const uid = chat.participants.find(p => p !== user.uid);
                const p = chatProfiles[uid];
                return (
                  <button key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}
                    className={`chat-list-item ${chat.id === chatId ? 'active' : ''}`}>
                    <div className="chat-list-avatar">{p?.name?.charAt(0)?.toUpperCase() || '?'}</div>
                    <div className="chat-list-info">
                      <p className="chat-list-name">{p?.name || '...'}</p>
                      <p className="chat-list-last">{chat.lastMessage || 'No messages yet'}</p>
                    </div>
                  </button>
                );
              })}

              {connections.length > 0 && (
                <>
                  <p className="chat-section-label">Start a conversation</p>
                  {connections.map(uid => {
                    const p = chatProfiles[uid];
                    return (
                      <button key={uid} onClick={() => openChat(uid)} className="chat-list-item">
                        <div className="chat-list-avatar">{p?.name?.charAt(0)?.toUpperCase() || '?'}</div>
                        <div className="chat-list-info">
                          <p className="chat-list-name">{p?.name || '...'}</p>
                          <p className="chat-list-last">Tap to message</p>
                        </div>
                      </button>
                    );
                  })}
                </>
              )}

              {chats.length === 0 && connections.length === 0 && (
                <div className="chat-empty">
                  <MessageSquare size={32} />
                  <p>Connect with students to start chatting</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Chat window */}
      {chatId ? (
        <div className="chat-window">
          <div className="chat-window-header">
            <button onClick={() => navigate('/chat')} className="chat-back">
              <ArrowLeft size={18} />
            </button>
            {otherProfile && (
              <>
                <div className="chat-window-avatar">{otherProfile.name?.charAt(0)?.toUpperCase() || '?'}</div>
                <div>
                  <p className="chat-window-name">{otherProfile.name}</p>
                  <p className="chat-window-uni">{otherProfile.university}</p>
                </div>
              </>
            )}
          </div>

          <div className="chat-messages">
            {messages.map(msg => {
              const isMe = msg.uid === user.uid;
              return (
                <div key={msg.id} className={`chat-msg-row ${isMe ? 'me' : 'other'}`}>
                  {!isMe && (
                    <div className="chat-msg-avatar">{otherProfile?.name?.charAt(0)?.toUpperCase() || '?'}</div>
                  )}
                  <div className={`chat-bubble ${isMe ? 'chat-bubble-me' : 'chat-bubble-other'}`}>
                    <p>{msg.text}</p>
                    <span className="chat-time">{formatTime(msg.createdAt)}</span>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="chat-input-row">
            <input
              value={msgText}
              onChange={e => setMsgText(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" disabled={sending || !msgText.trim()} className="chat-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <div className="chat-empty-window">
          <MessageSquare size={48} />
          <p>Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default Chats;
