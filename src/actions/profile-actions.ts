"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/auth-guards";
import { clientProfileSchema, importerProfileSchema } from "@/lib/schemas";
import { Role } from "@prisma/client";

function splitCsv(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function updateImporterProfile(formData: FormData) {
  const session = await requireRole([Role.IMPORTER]);
  const parsed = importerProfileSchema.safeParse({
    companyName: formData.get("companyName"),
    slug: formData.get("slug"),
    bio: formData.get("bio"),
    coveredCountries: formData.get("coveredCountries"),
    servicesOffered: formData.get("servicesOffered"),
    languagesSpoken: formData.get("languagesSpoken"),
    publicContactEmail: formData.get("publicContactEmail"),
    publicWhatsapp: formData.get("publicWhatsapp")
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid form data" };
  }

  const existingSlug = await prisma.importerProfile.findFirst({
    where: {
      slug: parsed.data.slug,
      NOT: { userId: session.user.id }
    }
  });

  if (existingSlug) {
    return { error: "Slug is already taken" };
  }

  await prisma.importerProfile.update({
    where: { userId: session.user.id },
    data: {
      companyName: parsed.data.companyName,
      slug: parsed.data.slug,
      bio: parsed.data.bio,
      coveredCountries: splitCsv(parsed.data.coveredCountries),
      servicesOffered: splitCsv(parsed.data.servicesOffered),
      languagesSpoken: splitCsv(parsed.data.languagesSpoken),
      publicContactEmail: parsed.data.publicContactEmail || null,
      publicWhatsapp: parsed.data.publicWhatsapp || null
    }
  });

  revalidatePath("/dashboard/importer");
  revalidatePath(`/importers/${parsed.data.slug}`);

  return { success: true };
}

export async function updateClientProfile(formData: FormData) {
  const session = await requireUser();
  const parsed = clientProfileSchema.safeParse({
    preferredLanguage: formData.get("preferredLanguage")
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid form data" };
  }

  await prisma.clientProfile.upsert({
    where: { userId: session.user.id },
    update: {
      preferredLanguage: parsed.data.preferredLanguage
    },
    create: {
      userId: session.user.id,
      preferredLanguage: parsed.data.preferredLanguage
    }
  });

  revalidatePath("/dashboard/client");

  return { success: true };
}
