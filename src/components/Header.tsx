import Image from "next/image";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="bg-white dark:bg-indigo shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/telescopepixel.png"
            alt="OpenTelemetry Logo"
            width={40}
            height={40}
          />
          <h1 className="ml-4 text-2xl font-bold">The OpenTelemetry Fund</h1>
        </div>
        <p className="text-sm">
          A clearinghouse for OpenTelemetry instrumentation requests.
        </p>
        <AuthButton />
      </div>
    </header>
  );
}
