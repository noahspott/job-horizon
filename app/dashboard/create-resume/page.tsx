"use client";

import { useState } from "react";
import Content from "@/app/components/ui/Content";
import ResumeDisplay from "@/app/components/ResumeDisplay";
import { parseResume } from "@/app/utils/parseResume";

export default function CreateResume() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateResume = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch("/api/claude/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await response.json();
      const parsedResume = parseResume(data.resume);
      if (parsedResume) {
        setResume(parsedResume);
      } else {
        console.error("No resume content found in response");
      }
    } catch (error) {
      console.error("Error generating resume:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900">
      <section className="py-12">
        <Content>
          <h1 className="text-3xl font-bold text-gray-100 mb-8">
            Create Resume
          </h1>
          <form onSubmit={handleGenerateResume} className="space-y-6">
            <div>
              <label
                htmlFor="jobDescription"
                className="block text-sm text-gray-300 mb-2"
              >
                Paste a job description below and we&apos;ll create a tailored
                resume for you
              </label>
              <textarea
                id="jobDescription"
                className="w-full h-48 p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={isGenerating}
              />
            </div>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition-colors ${
                isGenerating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-100 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gray-100 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-gray-100 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-2">Generating...</span>
                </div>
              ) : (
                "Generate Resume"
              )}
            </button>
          </form>

          {resume && !isGenerating && (
            <div className="mt-8">
              <ResumeDisplay resume={resume} />
            </div>
          )}
        </Content>
      </section>
    </main>
  );
}
