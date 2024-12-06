export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Protected Layout</h1>
      {children}
    </>
  );
}
