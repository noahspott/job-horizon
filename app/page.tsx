"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto px-4">
      <section className="py-20 flex flex-col gap-4 max-w-screen-md items-start">
        <h1 className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-white/80 via-white to-white/85 bg-clip-text text-transparent">
          JobHorizon.ai
        </h1>
        <p className="sm:text-lg font-light text-white/80">
          Your career companion for seamless job applications. Build your
          profile, generate tailored resumes and cover letters, and stay on top
          of your applications—all powered by AI.
        </p>
        <Link href={"/create-resume"}>
          <button className="bg-white text-black py-4 px-4 rounded-full uppercase tracking-wide font-medium hover:scale-105">
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
}
