import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ImagePlus, Loader } from "lucide-react";
import type { Post } from "../types";

interface CreatePostProps {
  onPostCreated?: (post: Post) => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  //Want to give some random color to posts:
  const COLOR_PALETTE = [
    '#F9D6B5',
    '#FAD0C9',
    '#87CEEB',
    '#6A0DAD',
    '#FF4500',
    '#FFD700',
    '#A8E6CF',
    '#00BFFF',
    '#2E8B57',
    '#FFF700'
  ];

  const getRandomColor =()=>{
    const randomIdx = Math.floor(Math.random() * COLOR_PALETTE.length);
    return COLOR_PALETTE[randomIdx];
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      // await uploadBytes(imageRef, image);
      // const imageUrl = await getDownloadURL(imageRef);

      // const res =  await addDoc(collection(db, 'posts'), {
      //     userId: user.uid,
      //     userName: user.displayName || user.email?.split('@')[0],
      //     // imageUrl,
      //     caption,
      //     likes: [],
      //     saves: [],
      //     createdAt: serverTimestamp(),
      //   });

      const postData = {
        userId: user.uid,
        userName: user.displayName || user.email?.split("@")[0],
        caption,
        likes: [],
        saves: [],
        createdAt: serverTimestamp(),
        bgColor: getRandomColor()
      };

      const docRef = await addDoc(collection(db, "posts"), postData);

      const newPost: Post = {
        id: docRef.id,
        ...postData,
        createdAt: Date.now(),
      };
      onPostCreated?.(newPost);
      setCaption("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <div className="mb-4">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-md resize-none"
          rows={3}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ImagePlus className="w-5 h-5 mr-2" />
          {image ? "Change Image" : "Add Image"}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="submit"
          disabled={loading || !caption.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Post"}
        </button>
      </div>
      {image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="max-h-60 rounded-md object-cover"
          />
        </div>
      )}
    </form>
  );
}
