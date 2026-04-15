import { Role } from "@prisma/client";
import { ClientProfileForm } from "@/components/forms/client-profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export default async function ClientProfilePage() {
  const session = await requireRole([Role.CLIENT]);
  const profile = await prisma.clientProfile.findUnique({ where: { userId: session.user.id } });

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit client profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientProfileForm
            initialValues={{
              preferredLanguage: profile?.preferredLanguage ?? "English"
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
