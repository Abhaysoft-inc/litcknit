import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Literary Council KNIT Sultanpur",
  description: "Official webpage of LITC KNIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
