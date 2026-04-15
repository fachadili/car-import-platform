import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function upsertUser(params: {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  phone?: string;
}) {
  const passwordHash = await bcrypt.hash("password123", 12);

  return prisma.user.upsert({
    where: { email: params.email },
    update: {
      firstName: params.firstName,
      lastName: params.lastName,
      role: params.role,
      phone: params.phone,
      passwordHash
    },
    create: {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      role: params.role,
      phone: params.phone,
      passwordHash
    }
  });
}

async function main() {
  const admin = await upsertUser({
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: Role.ADMIN
  });

  const importer = await upsertUser({
    email: "importer@example.com",
    firstName: "Ingrid",
    lastName: "Meyer",
    role: Role.IMPORTER,
    phone: "+49 555 100200"
  });

  const client = await upsertUser({
    email: "client@example.com",
    firstName: "Carlos",
    lastName: "Silva",
    role: Role.CLIENT
  });

  await prisma.importerProfile.upsert({
    where: { userId: importer.id },
    update: {
      companyName: "EuroAuto Bridge GmbH",
      slug: "euroauto-bridge",
      bio: "We manage end-to-end vehicle sourcing and import support from Germany into Europe.",
      coveredCountries: ["Germany", "France", "Netherlands"],
      servicesOffered: ["Inspection", "Negotiation", "Transport"],
      languagesSpoken: ["English", "German", "Portuguese"],
      isVerified: true,
      publicContactEmail: "hello@euroautobridge.example",
      publicWhatsapp: "+49 555 889900"
    },
    create: {
      userId: importer.id,
      companyName: "EuroAuto Bridge GmbH",
      slug: "euroauto-bridge",
      bio: "We manage end-to-end vehicle sourcing and import support from Germany into Europe.",
      coveredCountries: ["Germany", "France", "Netherlands"],
      servicesOffered: ["Inspection", "Negotiation", "Transport"],
      languagesSpoken: ["English", "German", "Portuguese"],
      isVerified: true,
      publicContactEmail: "hello@euroautobridge.example",
      publicWhatsapp: "+49 555 889900"
    }
  });

  await prisma.clientProfile.upsert({
    where: { userId: client.id },
    update: { preferredLanguage: "English" },
    create: {
      userId: client.id,
      preferredLanguage: "English"
    }
  });

  await prisma.clientProfile.upsert({
    where: { userId: admin.id },
    update: { preferredLanguage: "English" },
    create: {
      userId: admin.id,
      preferredLanguage: "English"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
