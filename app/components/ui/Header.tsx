import Link from "next/link";
import { createClient } from "../../utils/supabase/server";
import AuthButton from "../AuthButton";
import Content from "./Content";

export default async function Header({
  menuItems = [
    {
      href: "/dashboard/create-resume",
      display: "Create Resume",
    },
  ],
}: {
  menuItems?: Array<{ href: string; display: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="relative bg-gradient-to-r from-blue-950 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] opacity-30" />

      <Content>
        <nav className="flex items-center py-4 relative">
          <Link
            href="/"
            className="text-xl font-bold mr-auto text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text"
          >
            JobHorizon.ai
          </Link>
          <div className="flex items-center gap-6">
            {menuItems.map((menuItem) => (
              <Link
                key={menuItem.href}
                href={menuItem.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {menuItem.display}
              </Link>
            ))}
            <AuthButton />
          </div>
        </nav>
      </Content>
    </header>
  );
}
