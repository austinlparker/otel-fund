import Image from "next/image";

interface UserAvatarProps {
  user?: {
    name?: string | null;
    image?: string | null;
  } | null;
  size?: "sm" | "md" | "lg";
}

export default function UserAvatar({ user, size = "md" }: UserAvatarProps) {
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
    <div className="flex items-center space-x-2">
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-indigo flex items-center justify-center text-white`}
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
          <span>{initials}</span>
        )}
      </div>
      {user?.name && (
        <span className="font-medium text-slate dark:text-fog">
          {user.name}
        </span>
      )}
    </div>
  );
}
