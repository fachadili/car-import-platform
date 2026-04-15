"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateClientProfile } from "@/actions/profile-actions";
import { clientProfileSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = z.infer<typeof clientProfileSchema>;

export function ClientProfileForm({ initialValues }: { initialValues: FormData }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: initialValues
  });

  const onSubmit = (values: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const payload = new window.FormData();
      payload.set("preferredLanguage", values.preferredLanguage);
      const response = await updateClientProfile(payload);
      setMessage(response?.error ? response.error : "Profile updated.");
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="preferredLanguage">Preferred language</Label>
        <Input id="preferredLanguage" {...form.register("preferredLanguage")} />
      </div>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
