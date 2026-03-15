import React, { useState } from 'react';
import '../../styles/feed.css';
import CreatePost from '../../components/CreatePost';
import  PostList from '../../components/PostList';


const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      university: 'Stanford University',
      major: 'Computer Science',
    },
    content:
      'Just finished my final project for CS229! Machine learning is fascinating. Looking for collaborators on a side project involving NLP. Anyone interested? 🚀',
    timestamp: '2h ago',
    likes: 24,
    liked: false,
    comments: [
      {
        id: 'c1',
        author: { name: 'Michael Chen', avatar: 'MC' },
        content: "This sounds amazing! I'd love to collaborate.",
        timestamp: '1h ago',
      },
      {
        id: 'c2',
        author: { name: 'Emma Davis', avatar: 'ED' },
        content: 'Count me in! I have experience with transformers.',
        timestamp: '45m ago',
      },
    ],
  },
  {
    id: '2',
    author: {
      name: 'Alex Martinez',
      avatar: 'AM',
      university: 'MIT',
      major: 'Electrical Engineering',
    },
    content:
      'Attended an incredible robotics workshop today. The future of automation is here! Special thanks to Professor Williams for the insightful session.',
    timestamp: '5h ago',
    likes: 42,
    liked: true,
    comments: [],
  },
  {
    id: '3',
    author: {
      name: 'Emily Brown',
      avatar: 'EB',
      university: 'Harvard University',
      major: 'Business Administration',
    },
    content:
      "Our startup just got accepted into Y Combinator! Still can't believe it. Looking for talented developers to join our team. DM me if interested! 💼",
    timestamp: '1d ago',
    likes: 156,
    liked: false,
    comments: [
      {
        id: 'c3',
        author: { name: 'David Kim', avatar: 'DK' },
        content: 'Congratulations! This is huge!',
        timestamp: '20h ago',
      },
    ],
  },
];

export function Feed() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'YO',
        university: 'Your University',
        major: 'Your Major',
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      liked: false,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleComment = (postId) => {
    const commentText = (commentInputs[postId] || '').trim();
    if (!commentText) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                author: { name: 'You', avatar: 'YO' },
                content: commentText,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return post;
      })
    );

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const toggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  return (
    <div className="feed-container">
      <CreatePost
        newPost={newPost}
        setNewPost={setNewPost}
        handleCreatePost={handleCreatePost}
      />
      <PostList
        posts={posts}
        showComments={showComments}
        commentInputs={commentInputs}
        setCommentInputs={setCommentInputs}
        onLike={handleLike}
        onToggleComments={toggleComments}
        onComment={handleComment}
      />
    </div>
  );
}

export default Feed