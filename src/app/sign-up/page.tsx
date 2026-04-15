import { Role } from "@prisma/client";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SignUpPage({
  searchParams
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const defaultRole = params.role === Role.IMPORTER ? Role.IMPORTER : Role.CLIENT;

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Choose a role and start using the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm defaultRole={defaultRole} />
          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account? <Link href="/sign-in" className="text-blue-600">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
