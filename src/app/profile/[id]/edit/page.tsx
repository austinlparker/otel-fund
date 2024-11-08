import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserProfile } from "@/app/actions";
import EditProfileForm from "@/components/EditProfileForm";
import DefaultHeader from "@/components/DefaultHeader";

export default async function EditProfilePage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const user = await getUserProfile(params.id);

  if (!user) {
    notFound();
  }

  if (session.user.id !== user.id && !session.user.isAdmin) {
    redirect(`/profile/${session.user.id}`);
  }

  return (
    <>
      <DefaultHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <EditProfileForm user={user} />
      </div>
    </>
  );
}
