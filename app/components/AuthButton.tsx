import Link from "next/link";
import { Button } from "./ui/Button";
import { createClient } from "../utils/supabase/server";
import { signOutAction } from "../actions";

export default async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4 px-4 py-2 rounded-lg bg-gray-800/50">
      <Link
        href="/dashboard/profile"
        className="flex items-center gap-2 hover:bg-gray-700/50 px-3 py-1.5 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="text-sm text-gray-300 hover:text-gray-100">
          {user.email?.split("@")[0]}
        </span>
      </Link>
      <form action={signOutAction}>
        <Button variant="ghost" size="sm">
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
}
