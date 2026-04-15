import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function ImporterPublicPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await prisma.importerProfile.findUnique({ where: { slug } });

  if (!profile) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>{profile.companyName}</CardTitle>
            {profile.isVerified ? <Badge className="bg-green-100 text-green-700">Verified</Badge> : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{profile.bio}</p>
          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="mb-2 font-semibold">Countries covered</p>
              <ul className="space-y-1 text-muted-foreground">
                {profile.coveredCountries.map((country) => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold">Services offered</p>
              <ul className="space-y-1 text-muted-foreground">
                {profile.servicesOffered.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold">Languages spoken</p>
              <ul className="space-y-1 text-muted-foreground">
                {profile.languagesSpoken.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/requests/new">
            <Button>Start a request with this importer</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
