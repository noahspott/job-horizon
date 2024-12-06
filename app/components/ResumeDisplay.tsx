"use client";

import React, { useRef, useState } from "react";
import {
  downloadAsWord,
  downloadAsText,
  downloadAsPDF,
} from "../utils/downloadHandlers";

interface ResumeDisplayProps {
  resume: string;
}

const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ resume }) => {
  const resumeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (resumeRef.current && !copied) {
      navigator.clipboard.writeText(resumeRef.current.innerText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative resume-container p-8 bg-white shadow-md border rounded-lg">
        <button
          onClick={handleCopy}
          disabled={copied}
          className={`
            absolute top-2 right-2 px-3 py-1 rounded-md
            transition-all duration-300 ease-in-out
            ${
              copied
                ? "bg-green-500 cursor-default"
                : "bg-gray-500 hover:bg-gray-600 cursor-pointer"
            }
          `}
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <div className="resume-content">
          <pre ref={resumeRef} className="whitespace-pre-wrap text-black">
            {resume}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ResumeDisplay;
