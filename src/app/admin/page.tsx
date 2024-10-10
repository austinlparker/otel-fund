import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminDashboard from "@/components/AdminDashboard";
import DefaultHeader from "@/components/DefaultHeader";

export default async function AdminPage() {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    redirect("/");
  }

  return (
    <>
      <DefaultHeader />
      <AdminDashboard />
    </>
  );
}
