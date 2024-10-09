import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage() {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    redirect("/");
  }

  return <AdminDashboard />;
}
