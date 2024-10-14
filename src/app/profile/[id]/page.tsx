import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import DefaultHeader from "@/components/DefaultHeader";
import UserProfile from "@/components/UserProfile";
import UserBounties from "@/components/UserBounties";
import UserComments from "@/components/UserComments";
import { getUserProfile } from "@/app/actions";
import { Button } from "@/components/Button";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const user = await getUserProfile(params.id);

  if (!user) {
    notFound();
  }

  const isOwnProfile = session?.user?.id === user.id;
  const isAdmin = session?.user?.isAdmin ?? false;

  return (
    <>
      <DefaultHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          {(isOwnProfile || isAdmin) && (
            <Link href={`/profile/${user.id}/edit`} passHref>
              <Button variant="primary">Edit Profile</Button>
            </Link>
          )}
        </div>
        <UserProfile user={user} isOwnProfile={isOwnProfile} />
        <UserBounties userId={user.id} />
        <UserComments userId={user.id} />
      </div>
    </>
  );
}
