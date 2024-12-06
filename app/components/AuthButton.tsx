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
    <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-gray-800/50">
      <Link
        href="/dashboard/profile"
        className="flex items-center gap-1 sm:gap-2 hover:bg-gray-700/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm sm:text-base">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="text-xs sm:text-sm text-gray-300 hover:text-gray-100">
          {user.email?.split("@")[0]}
        </span>
      </Link>
      <form action={signOutAction}>
        <Button
          variant="link"
          size="sm"
          className="text-xs sm:text-sm py-1 px-2 sm:px-3"
        >
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="relative z-20 flex gap-2">
      <Link href="/sign-in">
        <Button className="text-xs sm:text-sm" variant="link">
          Sign in
        </Button>
      </Link>
    </div>
  );
}
