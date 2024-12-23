import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import Observability from "../components/Observability";
import { Toaster } from "react-hot-toast";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { PublicEnvScript } from "next-runtime-env";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "OpenTelemetry Fund",
  description:
    "Vote and comment on OpenTelemetry instrumentation library requests.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          <div className="antialiased">
            {modal}
            {children}
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: "",
                style: {
                  background: "var(--toast-bg, #FFFFFF)",
                  color: "var(--toast-text, #1E293B)",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                },
                success: {
                  iconTheme: {
                    primary: "#10B981",
                    secondary: "white",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#EF4444",
                    secondary: "white",
                  },
                },
                loading: {
                  iconTheme: {
                    primary: "#3B82F6",
                    secondary: "white",
                  },
                },
              }}
            />
          </div>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var darkMode = localStorage.getItem('darkMode') === 'true';
                if (darkMode) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </body>
      <Observability />
    </html>
  );
}
