import Image from "next/image";
import { User } from "../types";

interface UserAvatarProps {
  user?: Partial<User> | null;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export default function UserAvatar({
  user,
  size = "md",
  showName = false,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="flex items-center">
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-amber-500 dark:bg-amber-600 flex items-center justify-center text-amber-950 dark:text-amber-50 shadow-sm`}
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name || "User avatar"}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-medium">{initials}</span>
        )}
      </div>
      {showName && user?.name && (
        <span className="ml-2 text-sapphire_blue-800 dark:text-sapphire_blue-100 font-medium">
          {user.name}
        </span>
      )}
    </div>
  );
}
