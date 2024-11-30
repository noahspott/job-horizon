import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Horizon - Your AI-Powered Career Companion",
  description:
    "Simplify your job search with Job Horizon. Build your professional profile, generate personalized resumes and cover letters, track applications, and follow up effortlessly—all powered by advanced AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black text-white`}>{children}</body>
    </html>
  );
}
