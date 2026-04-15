"use server";

import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/schemas";

export async function signUpAction(formData: FormData) {
  const parsed = signUpSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp")
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid form data" };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { error: "Email already in use" };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  const user = await prisma.user.create({
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      passwordHash,
      role: parsed.data.role,
      phone: parsed.data.phone || null,
      whatsapp: parsed.data.whatsapp || null
    }
  });

  if (user.role === Role.IMPORTER) {
    await prisma.importerProfile.create({
      data: {
        userId: user.id,
        companyName: `${user.firstName} Imports`,
        slug: `${user.firstName}-${user.lastName}-${user.id.slice(-5)}`.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        bio: "Add your company presentation to increase trust and conversion.",
        coveredCountries: [],
        servicesOffered: [],
        languagesSpoken: ["English"]
      }
    });
  }

  if (user.role === Role.CLIENT || user.role === Role.ADMIN) {
    await prisma.clientProfile.create({
      data: {
        userId: user.id,
        preferredLanguage: "English"
      }
    });
  }

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false
  });

  return { success: true };
}

export async function signInAction(formData: FormData) {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid form data" };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function goToRoleDashboard(role: Role) {
  if (role === Role.CLIENT) {
    redirect("/dashboard/client");
  }

  if (role === Role.IMPORTER) {
    redirect("/dashboard/importer");
  }

  redirect("/dashboard/admin");
}
