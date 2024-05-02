"use client";
import React, { Suspense } from "react";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen w-screen flex">
      <Suspense fallback={<div>Loading...</div>}>
        {/* This component will be loaded dynamically */}
        <Scene />
      </Suspense>
    </main>
  );
}
