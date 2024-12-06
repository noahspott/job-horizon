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

  const handleDownload = async (format: string) => {
    switch (format) {
      case "pdf":
        await downloadAsPDF(resume);
        break;
      case "docx":
        await downloadAsWord(resume);
        break;
      case "txt":
        downloadAsText(resume);
        break;
      default:
        console.error("Unsupported format");
    }
  };

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

      {/* <div className="download-buttons flex justify-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm border">
        <button
          onClick={() => handleDownload("pdf")}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Download PDF
        </button>
        <button
          onClick={() => handleDownload("docx")}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
        >
          Download Word
        </button>
        <button
          onClick={() => handleDownload("txt")}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
        >
          Download Text
        </button>
      </div> */}
    </div>
  );
};

export default ResumeDisplay;
