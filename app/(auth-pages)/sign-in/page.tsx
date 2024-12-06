import MagicLinkForm from "@/app/components/MagicLinkForm";

export default function SignIn() {
  return (
    <main>
      <section className="py-20 px-4 flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Log in</h1>
        <MagicLinkForm />
      </section>
    </main>
  );
}
