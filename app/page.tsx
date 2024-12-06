"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-900 to-black -z-10" />

      {/* Animated grid pattern - optional */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] -z-5" />

      <div className="max-w-screen-xl mx-auto px-4">
        <section className="py-32 flex flex-col gap-8 max-w-screen-md items-start relative">
          {/* Gradient accent */}
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl font-black">
              <span className="bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent">
                JobHorizon.ai
              </span>
            </h1>

            <p className="text-xl font-light text-gray-300 leading-relaxed max-w-xl">
              Your career companion for seamless job applications. Build your
              profile, generate tailored resumes and cover letters, and stay on
              top of your applications—all powered by AI.
            </p>

            <div className="flex gap-4 items-center">
              <Link href="/dashboard/create-resume">
                <button className="group relative px-6 py-3 rounded-full bg-white text-black font-medium transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105">
                  Get Started
                  <span className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-black/50 to-transparent group-hover:animate-shine" />
                </button>
              </Link>

              <Link
                href="/how-it-works"
                className="text-gray-400 hover:text-white transition-colors"
              >
                How it Works →
              </Link>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid sm:grid-cols-2 gap-6 mt-12 w-full">
            {[
              {
                title: "AI-Powered",
                desc: "Smart resume tailoring for each job",
              },
              { title: "Time-Saving", desc: "Streamlined application process" },
              { title: "Professional", desc: "Industry-standard templates" },
              { title: "Organized", desc: "Track all your applications" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
              >
                <h3 className="font-semibold text-lg text-white/90">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
