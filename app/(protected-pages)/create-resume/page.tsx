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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await response.json();

      // Parse the resume from the response
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
    <main>
      <section className="py-20">
        <Content>
          <h1 className="text-4xl font-bold text-white">Create Resume</h1>
          <form onSubmit={handleGenerateResume}>
            <label
              htmlFor="jobDescription"
              className="block text-lg font-medium text-gray-200 mb-2 mt-6"
            >
              Paste a job description below and we'll create a tailored resume
              for you
            </label>
            <textarea
              id="jobDescription"
              className="w-full text-black p-2 border border-gray-300 rounded mt-4"
              placeholder="Paste job description here..."
              rows={10}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isGenerating}
            ></textarea>
            <button
              type="submit"
              className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 ${
                isGenerating ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="animate-pulse flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <span>AI is crafting your resume...</span>
                </>
              ) : (
                "Generate Resume"
              )}
            </button>
          </form>

          {isGenerating && (
            <div className="mt-8 text-center">
              <div className="inline-block p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-blue-700">
                    Analyzing job description and crafting the perfect resume...
                  </span>
                </div>
              </div>
            </div>
          )}

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
