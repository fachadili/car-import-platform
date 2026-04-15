import Link from "next/link";
import { requireRole } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ClientDashboardPage() {
  const session = await requireRole([Role.CLIENT]);

  const profile = await prisma.clientProfile.findUnique({
    where: { userId: session.user.id }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {session.user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">You can soon create and track vehicle import requests from here.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile summary</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">Preferred language: {profile?.preferredLanguage ?? "Not set"}</div>
          <Link href="/dashboard/client/profile">
            <Button variant="outline">Edit profile</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">No requests yet. Start your first vehicle request.</p>
          <Link href="/requests/new">
            <Button>Start a vehicle request</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
