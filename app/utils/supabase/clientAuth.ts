import { createClient } from "./client";

export async function checkUserAuth() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session ? true : false;
}
