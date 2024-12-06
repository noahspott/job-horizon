import Content from "../components/ui/Content";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <div className="bg-gray-700 text-gray-300 py-2 px-4 text-sm">
        <Content>Protected Page</Content>
      </div> */}
      {children}
    </>
  );
}
