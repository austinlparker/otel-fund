import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import DefaultHeader from "@/components/DefaultHeader";
import UserProfile from "@/components/UserProfile";
import UserBounties from "@/components/UserBounties";
import UserComments from "@/components/UserComments";
import { getUserProfile } from "@/app/actions";

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

  return (
    <>
      <DefaultHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
        <UserProfile user={user} isOwnProfile={isOwnProfile} />
        <UserBounties userId={user.id} />
        <UserComments userId={user.id} />
      </div>
    </>
  );
}
