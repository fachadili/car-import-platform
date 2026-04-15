import { Role } from "@prisma/client";
import { ImporterProfileForm } from "@/components/forms/importer-profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export default async function ImporterProfilePage() {
  const session = await requireRole([Role.IMPORTER]);
  const profile = await prisma.importerProfile.findUniqueOrThrow({ where: { userId: session.user.id } });

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit importer profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ImporterProfileForm
            initialValues={{
              companyName: profile.companyName,
              slug: profile.slug,
              bio: profile.bio,
              coveredCountries: profile.coveredCountries.join(", "),
              servicesOffered: profile.servicesOffered.join(", "),
              languagesSpoken: profile.languagesSpoken.join(", "),
              publicContactEmail: profile.publicContactEmail ?? "",
              publicWhatsapp: profile.publicWhatsapp ?? ""
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
