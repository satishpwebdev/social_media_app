import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import type { Post as PostType } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "lucide-react";
import WelcomeScreen from "../components/WelcomeScreen";

const POSTS_PER_PAGE = 4;

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async (lastDoc?: any) => {
    try {
      const postsQuery = lastDoc
        ? query(
            collection(db, "posts"),
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(POSTS_PER_PAGE)
          )
        : query(
            collection(db, "posts"),
            orderBy("createdAt", "desc"),
            limit(POSTS_PER_PAGE)
          );

      const snapshot = await getDocs(postsQuery);
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostType[];

      if (lastDoc) {
        setPosts((prev) => [...prev, ...newPosts]);
      } else {
        setPosts(newPosts);
      }

      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastVisible);
      setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = (newPost: PostType) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

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
    <div className="mx-auto">
      
      {!user ? (
        <>
          <WelcomeScreen></WelcomeScreen>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <>
            <CreatePost onPostCreated={handleNewPost} />
            <InfiniteScroll
              dataLength={posts.length}
              next={() => fetchPosts(lastVisible)}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center p-4">
                  <Loader className="w-6 h-6 animate-spin" />
                </div>
              }
              endMessage={
                <p className="text-center text-gray-500 py-4">
                  No more posts to load.
                </p>
              }
              className="space-y-6"
            >
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onDelete={handleDeletePost}
                  onSave={handleSavePost}
                  onLike={handleLikePost}
                />
              ))}
            </InfiniteScroll>
          </>
        </div>
      )}
    </div>
  );
}
