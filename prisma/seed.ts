import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.vote.deleteMany({});
  await prisma.bounty.deleteMany({});

  // Create some bounties
  const bounty1 = await prisma.bounty.create({
    data: {
      title: "Implement OpenTelemetry for Ruby on Rails",
      description:
        "Create a comprehensive OpenTelemetry integration for Ruby on Rails applications.",
      repoLink: "https://github.com/example/rails-opentelemetry",
      createdBy: "alice@example.com",
      votes: {
        create: [{ userEmail: "bob@example.com" }],
      },
    },
  });

  const bounty2 = await prisma.bounty.create({
    data: {
      title: "Enhance Python AsyncIO Support",
      description:
        "Improve OpenTelemetry support for Python AsyncIO-based applications.",
      repoLink: "https://github.com/example/python-asyncio-opentelemetry",
      createdBy: "bob@example.com",
      votes: {
        create: [{ userEmail: "alice@example.com" }],
      },
    },
  });

  console.log({ bounty1, bounty2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
