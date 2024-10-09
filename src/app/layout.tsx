import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          <div className="antialiased bg-fog dark:bg-slate text-slate dark:text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <Footer />
            <Toaster position="bottom-right" />
          </div>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var darkMode = localStorage.getItem('darkMode');
                if (darkMode === 'true') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
