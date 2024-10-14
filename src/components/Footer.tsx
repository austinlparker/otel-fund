import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-sapphire_blue-800 shadow-sm mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="/"
              className="text-lg font-semibold text-sapphire_blue-900 dark:text-sapphire_blue-50"
            >
              syzygetic.dev
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end">
            <Link
              href="/about"
              className="mx-2 my-1 text-sapphire_blue-700 dark:text-sapphire_blue-200 hover:text-amber-500"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="mx-2 my-1 text-sapphire_blue-700 dark:text-sapphire_blue-200 hover:text-amber-500"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="mx-2 my-1 text-sapphire_blue-700 dark:text-sapphire_blue-200 hover:text-amber-500"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="mx-2 my-1 text-sapphire_blue-700 dark:text-sapphire_blue-200 hover:text-amber-500"
            >
              Terms of Service
            </Link>
            <Link
              href="/tag"
              className="mx-2 my-1 text-sapphire_blue-700 dark:text-sapphire_blue-200 hover:text-amber-500"
            >
              Tag Index
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-center text-sm text-sapphire_blue-700 dark:text-sapphire_blue-200">
          © {new Date().getFullYear()} syzygetic.dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
