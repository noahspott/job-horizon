import Link from "next/link";
import AuthButton from "../AuthButton";
import Content from "./Content";
import { Button } from "./Button";

export default function Header({}: // menuItems = [
//   {
//     href: "/dashboard/create-resume",
//     display: "Create Resume",
//   },
// ],
{
  menuItems?: Array<{ href: string; display: string }>;
}) {
  return (
    <header className="relative z-10 bg-gradient-to-r from-blue-950 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] opacity-30" />

      <Content>
        {/* Top row - Auth Button */}
        <div className="flex justify-end py-1.5 sm:py-2 sm:hidden border-b border-gray-800/50">
          <AuthButton />
        </div>

        {/* Bottom row - Navigation */}
        <nav className="flex items-center justify-between py-2.5 sm:py-4 relative">
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text"
          >
            JobHorizon.ai
          </Link>

          <div className="flex items-center gap-2 sm:gap-6">
            <Link href="/dashboard/create-resume">
              <Button className="text-xs sm:text-sm">Create Resume</Button>
            </Link>
            <div className="hidden sm:block">
              <AuthButton />
            </div>
          </div>
        </nav>
      </Content>
    </header>
  );
}
