import Image from "next/image";
import Link from "next/link";

const STATIC_TAGLINE = "funny name, serious business";

export default function LogoTitle() {
  return (
    <Link href="/" className="flex items-center flex-shrink-0 cursor-pointer">
      <Image
        src="/images/syzy_logo.png"
        alt="syzygetic.dev logo"
        width={64}
        height={64}
      />
      <div className="ml-2 flex flex-col">
        <div className="flex items-baseline">
          <h1 className="text-xl font-bold text-sapphire_blue-900 dark:text-sapphire_blue-50 whitespace-nowrap font-silkscreen">
            syzygetic.dev
          </h1>
        </div>
        <span className="text-xs font-medium text-sapphire_blue-600 dark:text-sapphire_blue-300 font-silkscreen">
          {STATIC_TAGLINE}
        </span>
      </div>
    </Link>
  );
}
