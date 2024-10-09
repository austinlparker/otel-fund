import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate shadow-sm mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="/"
              className="text-lg font-semibold text-slate dark:text-fog"
            >
              OpenTelemetry Fund
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end">
            <Link
              href="/about"
              className="mx-2 my-1 text-slate dark:text-fog hover:text-pacific"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="mx-2 my-1 text-slate dark:text-fog hover:text-pacific"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="mx-2 my-1 text-slate dark:text-fog hover:text-pacific"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="mx-2 my-1 text-slate dark:text-fog hover:text-pacific"
            >
              Terms of Service
            </Link>
            <Link
              href="/tag"
              className="mx-2 my-1 text-slate dark:text-fog hover:text-pacific"
            >
              Tags
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-center text-sm text-slate dark:text-fog">
          © {new Date().getFullYear()} OpenTelemetry Fund. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
