import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";

export const metadata: Metadata = {
  title: "Euro Vehicle Import Platform",
  description: "MVP foundation for connecting clients and vehicle importers"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="text-lg font-semibold">
              AutoImport Hub
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/">Home</Link>
              {session?.user ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  <SignOutButton />
                </>
              ) : (
                <>
                  <Link href="/sign-in">Sign in</Link>
                  <Link href="/sign-up" className="font-medium text-blue-600">
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
