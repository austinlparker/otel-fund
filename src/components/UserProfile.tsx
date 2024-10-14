import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

interface UserProfileProps {
  user: Partial<User>;
  isOwnProfile: boolean;
}

export default function UserProfile({ user, isOwnProfile }: UserProfileProps) {
  const socialLinks = user.socialLinks
    ? JSON.parse(user.socialLinks as string)
    : [];

  return (
    <div className="bg-white dark:bg-sapphire_blue-800 p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between">
        <div className="flex items-start space-x-4">
          <UserAvatar user={user} size="lg" />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              {user.githubUrl && (
                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sapphire_blue-600 dark:text-sapphire_blue-300 hover:text-amber-500"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              )}
            </div>
            <p className="text-sapphire_blue-600 dark:text-sapphire_blue-300">
              {user.email}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-semibold mb-1">Social Links:</h3>
                <ul className="space-y-1">
                  {socialLinks.map(
                    (
                      link: { platform: string; url: string },
                      index: number,
                    ) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200 flex items-center"
                        >
                          <FontAwesomeIcon icon={faLink} className="mr-2" />
                          {link.platform}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div>
          <Button
            variant="primary"
            as="a"
            href={user.paymentLink || "#"}
            disabled={!user.paymentLink}
            className={!user.paymentLink ? "opacity-50 cursor-not-allowed" : ""}
          >
            Sponsor
          </Button>
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
