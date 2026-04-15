import Link from "next/link";
import { Role } from "@prisma/client";
import { requireRole } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function getCompleteness(profile: {
  companyName: string;
  bio: string;
  coveredCountries: string[];
  servicesOffered: string[];
  languagesSpoken: string[];
}) {
  const checkpoints = [
    !!profile.companyName,
    !!profile.bio,
    profile.coveredCountries.length > 0,
    profile.servicesOffered.length > 0,
    profile.languagesSpoken.length > 0
  ];

  return Math.round((checkpoints.filter(Boolean).length / checkpoints.length) * 100);
}

export default async function ImporterDashboardPage() {
  const session = await requireRole([Role.IMPORTER]);

  const profile = await prisma.importerProfile.findUniqueOrThrow({
    where: { userId: session.user.id }
  });

  const completeness = getCompleteness(profile);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {session.user.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Manage your profile and prepare for incoming vehicle requests.
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile completeness</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">{completeness}%</p>
            {profile.isVerified ? <Badge>Verified importer</Badge> : <Badge>Verification pending</Badge>}
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/importer/profile">
              <Button variant="outline">Edit profile</Button>
            </Link>
            <Link href={`/importers/${profile.slug}`}>
              <Button>View public profile</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requests inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No requests yet. This area will list submitted client requests.</p>
        </CardContent>
      </Card>
    </div>
  );
}
