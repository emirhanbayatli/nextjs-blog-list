"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
type Post = {
  id: number;
  title: string;
  body: string;
};
export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, []);

  console.log(posts);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Post List</h1>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ">
                <div className="flex flex-col items-center p-6 relative">
                  <img
                    src={`https://randomuser.me/api/portraits/women/${post.id}.jpg`}
                    alt="User profile"
                    className="rounded-full mb-4 "
                  />
                  <h2 className="text-lg font-semibold text-gray-800 text-center mb-2 line-clamp-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 text-center line-clamp-2">
                    {post.body}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
