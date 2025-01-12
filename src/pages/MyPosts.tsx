import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import Post from "../components/Post";
import type { Post as PostType } from "../types";

export default function MyPosts() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      const q = query(
        collection(db, "posts"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostType[];

      setPosts(postsData);
    };

    fetchPosts();
  }, [user]);

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleSavePost = (postId: string, isSaved: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              saves: isSaved
                ? [...post.saves, user!.uid]
                : post.saves.filter((id) => id !== user!.uid),
            }
          : post
      )
    );
  };

  const handleLikePost = (postId: string, isLiked: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: isLiked
                ? [...post.likes, user!.uid]
                : post.likes.filter((id) => id !== user!.uid),
            }
          : post
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't created any posts yet.
        </p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={handleDeletePost}
            onSave={handleSavePost}
            onLike={handleLikePost}
          />
        ))
      )}
    </div>
  );
}
