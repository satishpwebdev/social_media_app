import { useState, useEffect } from "react";
// import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Bookmark, Trash2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import type { Post as PostType } from "../types";
import Comments from "./Comments";
import type { Comment as CommentType } from "../types";

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

interface PostProps {
  post: PostType;
  onDelete?: (postId: string) => void;
  onSave?: (postId: string, isSaved: boolean) => void;
  onLike?: (postId: string, isLiked: boolean) => void;
}

export default function Post({ post, onDelete, onSave, onLike }: PostProps) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const isLiked = user && post.likes.includes(user.uid);
  const isSaved = user && post.saves.includes(user.uid);

  const handleLike = async () => {
    if (!user) return;
    const postRef = doc(db, "posts", post.id);
    const newIsLiked = !isLiked;

    try {
      await updateDoc(postRef, {
        likes: newIsLiked ? arrayUnion(user.uid) : arrayRemove(user.uid),
      });
      onLike?.(post.id, newIsLiked);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    const postRef = doc(db, "posts", post.id);
    const newIsSaved = !isSaved;
    try {
      await updateDoc(postRef, {
        saves: newIsSaved ? arrayUnion(user.uid) : arrayRemove(user.uid),
      });
      onSave?.(post.id, newIsSaved);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleDelete = async () => {
    if (!user || user.uid !== post.userId) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", post.id));
        onDelete?.(post.id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const [allComments, setAllComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", post.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CommentType[];
      setAllComments(commentsData);
    });

    return () => unsubscribe();
  }, [post.id]);

  return (
    <div className="bg-white text-white rounded-lg shadow-md mb-6 gap-4">
      <div
        style={{ backgroundColor: post.bgColor }}
        className="p-4  border-b  rounded-lg"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold">{post.userName}</div>
          <div className="text-gray-500 text-sm">
            {/* {formatDistanceToNow(post.createdAt, { addSuffix: true })} */}
          </div>
        </div>
        <p className={`text-white`}>{post.caption}</p>
      </div>
      {/* <img
        src={post.imageUrl}
        alt={post.caption}
        className="w-full object-cover max-h-96"
      /> */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? "text-red-500" : "text-gray-600"
              }`}
              disabled={!user}
            >
              <Heart
                className="w-6 h-6"
                fill={isLiked ? "currentColor" : "none"}
              />
              <span>{post.likes.length}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-600"
            >
              <MessageCircle className="w-6 h-6" />
              <span>{allComments.length}</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {user?.uid === post.userId && (
              <button
                onClick={handleDelete}
                className="text-gray-600 hover:text-red-500"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={handleSave}
              className={`${isSaved ? "text-yellow-500" : "text-gray-600"}`}
              disabled={!user}
            >
              <Bookmark
                className="w-6 h-6"
                fill={isSaved ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
        {showComments && <Comments postId={post.id} />}
      </div>
    </div>
  );
}
