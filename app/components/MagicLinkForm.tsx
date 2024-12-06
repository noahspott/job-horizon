"use client";

import { Button } from "./ui/Button";
import { signInAction } from "../actions";
import { useState } from "react";

export default function MagicLinkForm() {
  const [linkSent, setLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = (e.target as HTMLFormElement).email.value;
    console.log("Email:", email);

    try {
      setIsLoading(true);
      const data = await signInAction(email);
      console.log("Success:", data);
      setLinkSent(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="w-full max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-200"
        >
          Email address
        </label>
        <input
          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors focus:bg-gray-800"
          type="email"
          name="email"
          placeholder="name@example.com"
          required
        />
        {linkSent && (
          <p className="text-sm text-green-400 mt-2">
            ✓ Check your email for the magic link
          </p>
        )}
      </div>
      <Button
        className="w-full py-2.5 text-sm font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          "Continue with Email"
        )}
      </Button>
    </form>
  );
}
