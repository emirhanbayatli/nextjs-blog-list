"use client";
import Loading from "@/app/components/loading";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
interface Post {
  userId: string;
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: string;
}
interface Reactions {
  likes: number;
  dislikes: number;
}

export default function Post() {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.id) {
          setPost(null);
        } else {
          setPost(data);
        }
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Post not found!</h2>
        <Link href="/">
          <button className="btn">Go Home</button>
        </Link>
      </div>
    );
  }

  console.log(post);
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="shadow-lg rounded-3xl p-8 max-w-2xl w-full">
        <div className="flex items-center justify-center mb-6 ">
          <div className="relative w-16 h-16">
            <img
              src={`https://randomuser.me/api/portraits/women/${post.id}.jpg`}
              alt="User profile"
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {post.title}
        </h1>

        <p className="text-gray-700 mb-6 ">{post.body}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-gray-600 font-medium">
          <span>👍 Likes: {post.reactions.likes}</span>
          <span>👎 Dislikes: {post.reactions.dislikes}</span>
          <span>👁️ Views: {post.views}</span>
        </div>
      </div>

      <Link href="/">
        <button className="btn m-4">Go Home</button>
      </Link>
    </div>
  );
}
