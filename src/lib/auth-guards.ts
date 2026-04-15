import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return session;
}

export async function requireRole(allowed: Role[]) {
  const session = await requireUser();

  if (!allowed.includes(session.user.role)) {
    redirect("/dashboard");
  }

  return session;
}
