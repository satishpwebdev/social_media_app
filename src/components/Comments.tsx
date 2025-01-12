import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import type { Comment as CommentType } from '../types';

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CommentType[];
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    await addDoc(collection(db, 'comments'), {
      postId,
      userId: user.uid,
      userName: user.displayName || user.email?.split('@')[0],
      content: newComment.trim(),
      createdAt: serverTimestamp(),
    });

    setNewComment('');
  };

  return (
    <div className="mt-4">
      {user && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-3 py-2 text-black border rounded-md"
          />
        </form>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          console.log("dSVdsb", comment.createdAt),
          <div key={comment.id} className="flex items-start space-x-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-500">{comment.userName}</span>
                <span className="text-gray-500 text-sm">
                  {/* {formatDistanceToNow(comment.createdAt, { addSuffix: true })} */}
                  {/* {comment.createdAt} */}
                </span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}