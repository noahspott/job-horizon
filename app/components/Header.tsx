import Link from "next/link";
import { createClient } from "../utils/supabase/server";
import AuthButton from "./AuthButton";
import Content from "./ui/Content";

export default async function Header() {
  const menuItems = [
    {
      href: "/",
      display: "home",
    },
  ];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    user && (
      <header className="bg-white text-black">
        <Content>
          <nav className=" flex justify-between items-center">
            {menuItems.map((menuItem) => {
              return (
                <Link
                  key={menuItem.href}
                  href={menuItem.href}
                  className="text-lg font-bold uppercase"
                >
                  {menuItem.display}
                </Link>
              );
            })}
            <AuthButton styles="bg-black text-white" />
          </nav>
        </Content>
      </header>
    )
  );
}
