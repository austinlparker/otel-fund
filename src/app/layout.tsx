import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "OpenTelemetry Fund",
  description:
    "Vote and comment on OpenTelemetry instrumentation library requests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className="antialiased bg-fog dark:bg-slate text-slate dark:text-white">
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster position="bottom-right" />
        </body>
      </Providers>
    </html>
  );
}
