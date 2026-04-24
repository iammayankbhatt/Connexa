import React, { useState } from 'react';
import '../../styles/feed.css';
import CreatePost from '../../components/CreatePost';
import PostList from '../../components/PostList';
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon } from 'lucide-react';

import { useEffect } from "react";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db,auth } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export function Feed() {
  // const [posts, setPosts] = useState(mockPosts);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(data);
    });

    return () => unsubscribe();
  }, []);
  
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const user = auth.currentUser;
    if(!user){
      alert("User not logged in");
      return;
    }

    const userRef=doc(db, "users", user.uid);
    const userSnap=await getDoc(userRef);
    let userData={};
    if(userSnap.exists()){
      userData=userSnap.data();
    }

    const post = {
      author: {
        name: userData.name || "Unknown",
        avatar:userData.name?.charAt(0)?.toUpperCase() ||user.email?.charAt(0)?.toUpperCase() ||"?",
        university: userData.university ||"Unknown",
        major: 'Your Major',
      },
      content: newPost,
      timestamp: 'Just now',
      createdAt: serverTimestamp(), // important for sorting
      likes: 0,
      liked: false,
      comments: [],
    };

    await addDoc(collection(db, "posts"), post);

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
    const commentText = commentInputs?.[postId]?.trim();

    if (!commentText) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...(post.comments || []),
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

    // clear input
    setCommentInputs((prev) => ({
      ...prev,[postId]: '',
    }));
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
        ImageIcon={ImageIcon}
      />
      <PostList
        posts={posts}
        showComments={showComments}
        commentInputs={commentInputs}
        setCommentInputs={setCommentInputs}
        onLike={handleLike}
        onToggleComments={toggleComments}
        onComment={handleComment}
        Heart={Heart}
        MessageCircle={MessageCircle}
        Share2={Share2}
        Send={Send}
      />
    </div>
  );
}

export default Feed;