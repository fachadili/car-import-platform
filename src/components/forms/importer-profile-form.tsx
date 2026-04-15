"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateImporterProfile } from "@/actions/profile-actions";
import { importerProfileSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = z.infer<typeof importerProfileSchema>;

export function ImporterProfileForm({
  initialValues
}: {
  initialValues: FormData;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(importerProfileSchema),
    defaultValues: initialValues
  });

  const onSubmit = (values: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const payload = new window.FormData();
      Object.entries(values).forEach(([key, value]) => payload.set(key, value || ""));
      const response = await updateImporterProfile(payload);
      setMessage(response?.error ? response.error : "Profile updated.");
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="companyName">Company name</Label>
        <Input id="companyName" {...form.register("companyName")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">Public slug</Label>
        <Input id="slug" {...form.register("slug")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <textarea id="bio" className="min-h-28 w-full rounded-md border p-3 text-sm" {...form.register("bio")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="coveredCountries">Covered countries (comma separated)</Label>
        <Input id="coveredCountries" {...form.register("coveredCountries")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="servicesOffered">Services offered (comma separated)</Label>
        <Input id="servicesOffered" {...form.register("servicesOffered")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="languagesSpoken">Languages spoken (comma separated)</Label>
        <Input id="languagesSpoken" {...form.register("languagesSpoken")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="publicContactEmail">Public email (optional)</Label>
          <Input id="publicContactEmail" {...form.register("publicContactEmail")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="publicWhatsapp">Public WhatsApp (optional)</Label>
          <Input id="publicWhatsapp" {...form.register("publicWhatsapp")} />
        </div>
      </div>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
