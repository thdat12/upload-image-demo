"use client";

import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
    } else {
      router.push("/posts");
    }
  });
  <>
    <main></main>;
  </>;
}
