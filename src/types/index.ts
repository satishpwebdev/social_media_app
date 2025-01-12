export interface Post {
  id: string;
  userId: string;
  userName?: string;
  // imageUrl: string;
  caption: string;
  likes: string[];
  saves: string[];
  createdAt: number;
  bgColor: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: number;
  parentId?: string;
}