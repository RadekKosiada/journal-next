import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <header>
          <nav>
            <Link className="" href="/">Home</Link>
            <Link className="" href="/dashboard">Dashboard</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer>Footer</footer>

      </body>
    </html>
  );
}
