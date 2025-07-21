import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
        <header>
          <nav>Nav</nav>
        </header>

        <main>{children}</main>

        <footer>Footer</footer>

      </body>
    </html>
  );
}
