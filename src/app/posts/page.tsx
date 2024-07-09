"use client";

import Head from "next/head";
import PostPage from "../components/posts";
import { PostProvider } from "../lib/context/postContext";

export default function Home() {
  return (
    <>
      <PostProvider>
        <PostPage />
      </PostProvider>
    </>
  );
}
