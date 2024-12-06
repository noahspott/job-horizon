import Link from "next/link";
import Button from "./ui/Button";
import { createClient } from "../utils/supabase/server";
import { signOutAction } from "../actions";

export default async function AuthButton({ styles }: { styles: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button styles={styles}>Sign out</Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button styles={styles}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
}
