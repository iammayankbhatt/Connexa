import React from 'react';
import PostCard from './PostCard';

const PostList = ({
  posts,
  showComments,
  commentInputs,
  setCommentInputs,
  onLike,
  onToggleComments,
  onComment,
  Heart,
  MessageCircle,
  Share2,
  Send,
}) => {
  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          showComments={showComments[post.id]}
          commentInput={commentInputs[post.id] || ''}
          setCommentInputs={setCommentInputs}
          onLike={onLike}
          onToggleComments={onToggleComments}
          onComment={onComment}
          Heart={Heart}
          MessageCircle={MessageCircle}
          Share2={Share2}
          Send={Send}
        />
      ))}
    </>
  );
};

export default PostList;