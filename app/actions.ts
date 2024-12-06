"use server";

import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";

export const signInAction = async (email: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/create-resume`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Check your email for the magic link." };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
