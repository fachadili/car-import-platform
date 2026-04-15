import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Access your dashboard and manage your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <p className="mt-4 text-sm text-muted-foreground">
            New here? <Link href="/sign-up" className="text-blue-600">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
