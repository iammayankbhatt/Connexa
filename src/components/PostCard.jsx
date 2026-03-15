import React from 'react'

const PostCard = ({
  post,
  showComments,
  commentInput,
  setCommentInputs,
  onLike,
  onToggleComments,
  onComment,
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
    
  return (
    <div className="card post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="avatar avatar-post">{post.author.avatar}</div>
        <div className="post-header-info">
          <h3 className="post-author-name">{post.author.name}</h3>
          <p className="post-author-meta">
            {post.author.major} • {post.author.university}
          </p>
          <p className="post-timestamp">{post.timestamp}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="post-content">{post.content}</p>

      {/* Post Stats */}
      <div className="post-stats">
        <span>{post.likes} likes</span>
        <span>{post.comments.length} comments</span>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button
          onClick={() => onLike(post.id)}
          className={`post-action-button like-button ${
            post.liked ? 'like-button-active' : ''
          }`}
        >
          <span>Like</span>
        </button>
        <button
          onClick={() => onToggleComments(post.id)}
          className="post-action-button"
        >
          <span>Comment</span>
        </button>
        <button className="post-action-button">
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          {/* Existing Comments */}
          {post.comments.map((comment) => (
            <div key={comment.id} className="comment-row">
              <div className="avatar avatar-comment">
                {comment.author.avatar}
              </div>
              <div className="comment-body">
                <div className="comment-content-wrapper">
                  <p className="comment-author-name">
                    {comment.author.name}
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
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard
