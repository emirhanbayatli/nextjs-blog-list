"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};
export default function Home() {
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
  return (
    <main>
      <h1>Post List</h1>
      <span className="loading loading-dots loading-xl"></span>
      <ul>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <li key={post.id}>{post.title}</li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
