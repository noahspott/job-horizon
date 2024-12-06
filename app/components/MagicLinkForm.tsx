"use client";

import Button from "./ui/Button";
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 max-w-80">
        <label htmlFor="email">Email:</label>
        <input className="p-1 text-black" type="email" name="email" required />
        <p className="text-white">
          {linkSent ? "Check your email for the magic link." : ""}
        </p>
      </div>
      <Button styles="bg-white text-black self-start">
        {isLoading ? "Sending..." : "Login / Signup"}
      </Button>
    </form>
  );
}
