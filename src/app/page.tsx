"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularApps from "@/components/PopularApps";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <Hero />
      <PopularApps />
    </main>
  );
}
