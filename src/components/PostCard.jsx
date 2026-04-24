import React from 'react';
import { auth } from "../firebase/firebase";

const PostCard = ({
  post,
  showComments,
  commentInput,
  setCommentInputs,
  onLike,
  onToggleComments,
  onComment,
  Heart,
  MessageCircle,
  Share2,
  Send,
}) => {
  const handleChange = (e) => {
    setCommentInputs((prev) => ({
      ...prev,
      [post.id]: e.target.value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onComment(post.id);
    }
  };

  const currentUser = auth.currentUser;

  return (
    <div className="card post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="avatar avatar-post">{post.author?.avatar || "?"}</div>
        <div className="post-header-info">
          <h3 className="post-author-name">
            {post.userId === currentUser?.uid ? "You" : post.author?.name || "Unknown"}
          </h3>
          <p className="post-author-meta">
            {post.author?.major || ""} • {post.author?.university || ""}
          </p>
          <p className="post-timestamp">{post.timestamp}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="post-content">{post.content}</p>

      {/* Post Stats */}
      <div className="post-stats">
        <span>{post.likes} likes</span>
        <span>{post.comments?.length || 0} comments</span>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button
          onClick={() => onLike(post.id)}
          className={`post-action-button like-button ${
            post.liked ? 'like-button-active' : ''
          }`}
        >
          {Heart && (
            <Heart
              className={`icon ${post.liked ? 'icon-heart-filled' : ''}`}
            />
          )}
          <span>Like</span>
        </button>
        <button
          onClick={() => onToggleComments(post.id)}
          className="post-action-button"
        >
          {MessageCircle && <MessageCircle className="icon" />}
          <span>Comment</span>
        </button>
        <button className="post-action-button">
          {Share2 && <Share2 className="icon" />}
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          {/* Existing Comments */}
          {(post.comments || []).map((comment) => (
            <div key={comment.id} className="comment-row">
              <div className="avatar avatar-comment">
                {comment.author?.avatar||"?"}
              </div>
              <div className="comment-body">
                <div className="comment-content-wrapper">
                  <p className="comment-author-name">
                    {comment.author?.name || "Unknown"}
                  </p>
                  <p className="comment-text">{comment.content}</p>
                </div>
                <p className="comment-timestamp">{comment.timestamp}</p>
              </div>
            </div>
          ))}

          {/* Add Comment Input */}
          <div className="comment-input-row">
            <div className="avatar avatar-you-small">YO</div>
            <div className="comment-input-wrapper">
              <input
                type="text"
                value={commentInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Write a comment..."
                className="comment-input"
              />
              <button
                onClick={() => onComment(post.id)}
                className="comment-send-button"
              >
                {Send && <Send className="icon" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;