import { AdminDashboard } from "@/features/admin/ui/admin-dashboard";
import { verifyAdmin } from "@/features/auth/model/actions";
import { notFound } from "next/navigation";

export default async function AdminPage() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    notFound();
  }

  return <AdminDashboard />;
}
