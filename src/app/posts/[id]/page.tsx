"use client";
import Loading from "@/app/components/loading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Post() {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
    setLoading(false);
  }, [postId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  console.log(post);
  return <>Post detail {postId}</>;
}
