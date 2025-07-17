import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "Yami UI",
    template: "%s - Yami UI",
  },
  description: "A shader component library for ReactJS.",
  twitter: {
    card: "summary_large_image", // shows opengraph image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] font-[var(--font-sans)] text-[var(--foreground)] flex justify-center">
        <div className="max-w-screen-2xl min-h-screen w-full border border-[var(--border)]">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
