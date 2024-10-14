import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";

interface UserProfileProps {
  user: Partial<User>;
  isOwnProfile: boolean;
}

export default function UserProfile({ user, isOwnProfile }: UserProfileProps) {
  return (
    <div className="bg-white dark:bg-sapphire_blue-800 p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center space-x-4">
        <UserAvatar user={user} size="lg" />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sapphire_blue-600 dark:text-sapphire_blue-300">
            {user.email}
          </p>
        </div>
      </div>
      {isOwnProfile && (
        <p className="mt-4 text-sapphire_blue-600 dark:text-sapphire_blue-300">
          This is your profile
        </p>
      )}
    </div>
  );
}
