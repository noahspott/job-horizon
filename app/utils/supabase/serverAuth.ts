import { createClient } from "./server";

export async function checkUserAuth() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session ? true : false;
}
