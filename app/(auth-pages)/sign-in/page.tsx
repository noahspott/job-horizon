import MagicLinkForm from "@/app/components/MagicLinkForm";
import Content from "@/app/components/ui/Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignIn() {
  return (
    <main className="min-h-screen bg-gray-900">
      <section className="py-12">
        <Content>
          <h1 className="text-3xl font-bold text-gray-100 mb-8">Sign In</h1>
          <MagicLinkForm />
        </Content>
      </section>
    </main>
  );
}
