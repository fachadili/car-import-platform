import { goToRoleDashboard } from "@/actions/auth-actions";
import { requireUser } from "@/lib/auth-guards";

export default async function DashboardPage() {
  const session = await requireUser();
  await goToRoleDashboard(session.user.role);
  return null;
}
