"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signUpAction } from "@/actions/auth-actions";
import { signUpSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = z.infer<typeof signUpSchema>;

export function SignUpForm({ defaultRole = Role.CLIENT }: { defaultRole?: Role }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: defaultRole,
      phone: "",
      whatsapp: ""
    }
  });

  const onSubmit = (values: FormData) => {
    startTransition(async () => {
      const payload = new window.FormData();
      Object.entries(values).forEach(([key, value]) => payload.set(key, value ?? ""));
      const response = await signUpAction(payload);
      if (response?.error) {
        setError(response.error);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" {...form.register("firstName")} />
          <p className="text-xs text-red-600">{form.formState.errors.firstName?.message}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" {...form.register("lastName")} />
          <p className="text-xs text-red-600">{form.formState.errors.lastName?.message}</p>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register("email")} />
        <p className="text-xs text-red-600">{form.formState.errors.email?.message}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...form.register("password")} />
        <p className="text-xs text-red-600">{form.formState.errors.password?.message}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Account type</Label>
        <select id="role" className="h-10 w-full rounded-md border px-3" {...form.register("role")}>
          <option value={Role.CLIENT}>Client</option>
          <option value={Role.IMPORTER}>Importer</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" {...form.register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp (optional)</Label>
          <Input id="whatsapp" {...form.register("whatsapp")} />
        </div>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
