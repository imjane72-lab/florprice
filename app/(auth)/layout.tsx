import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Minimal header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            FlorPrice
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}
