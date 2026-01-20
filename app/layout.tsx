import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Task Force Pro - Your AI Workforce, Orchestrated",
  description: "Manage your AI workforce with real-time monitoring, workflow templates, and intelligent chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
