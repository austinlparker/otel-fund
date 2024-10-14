import { PrismaClient, Prisma, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

type Category =
  | "AWS"
  | "Java"
  | "JavaScript"
  | "Python"
  | "Database"
  | "DevOps";

const categories: Record<Category, string[]> = {
  AWS: [
    "S3 Backup Tool",
    "EC2 Manager",
    "CloudWatch Dashboard",
    "Lambda Scheduler",
    "RDS Backup Script",
  ],
  Java: [
    "Java Collections Library",
    "Spring Boot Utility",
    "Hibernate ORM Tool",
    "JavaFX Component",
    "JUnit Test Helper",
  ],
  JavaScript: [
    "React State Manager",
    "Node.js Auth Module",
    "Vue.js Plugin",
    "Express Middleware",
    "TypeScript Validator",
  ],
  Python: [
    "Django REST Framework Extension",
    "Flask Login System",
    "Pandas Data Cleaner",
    "NumPy Array Helper",
    "FastAPI Caching Tool",
  ],
  Database: [
    "SQL Migration Tool",
    "NoSQL Backup Utility",
    "Postgres Query Optimizer",
    "Redis Cache Manager",
    "MongoDB Aggregator",
  ],
  DevOps: [
    "CI/CD Pipeline Script",
    "Kubernetes Deployment Helper",
    "Docker Image Builder",
    "Terraform AWS Module",
    "Ansible Playbook",
  ],
};

function generateTitle(): { category: Category; title: string } {
  const category = faker.helpers.arrayElement(
    Object.keys(categories),
  ) as Category;
  return { category, title: faker.helpers.arrayElement(categories[category]) };
}

function generateTags(category: Category): string[] {
  const tagsMap: Record<Category, string[]> = {
    AWS: ["AWS", "Cloud", "Infrastructure"],
    Java: ["Java", "JVM", "Backend"],
    JavaScript: ["JavaScript", "Frontend", "Node.js"],
    Python: ["Python", "Backend", "API"],
    Database: ["Database", "SQL", "NoSQL"],
    DevOps: ["DevOps", "CI/CD", "Infrastructure"],
  };
  return tagsMap[category] || [];
}

function generateDescription(): { description: string; quality: string } {
  const quality = faker.helpers.arrayElement(["high", "medium", "low"]);
  if (quality === "high") {
    return {
      description: faker.company.catchPhrase() + ". " + faker.hacker.phrase(),
      quality,
    };
  } else if (quality === "medium") {
    return {
      description: faker.company.catchPhrase() + ". " + faker.hacker.phrase(),
      quality,
    };
  } else {
    return { description: faker.hacker.phrase(), quality };
  }
}

async function generateUsers(count: number): Promise<Prisma.UserCreateInput[]> {
  const users: Prisma.UserCreateInput[] = [];
  for (let i = 0; i < count; i++) {
    const user: Prisma.UserCreateInput = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    users.push(user);
  }
  return users;
}

async function main() {
  await prisma.comment.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.bounty.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  // Generate and create users in the database
  const userInputs = await generateUsers(50);
  const createdUsers = await Promise.all(
    userInputs.map((user) => prisma.user.create({ data: user })),
  );

  for (let i = 0; i < 128; i++) {
    const { category, title } = generateTitle();
    const tags = generateTags(category);
    const { description, quality } = generateDescription();

    // Adjust vote count based on quality
    let maxVotes: number;
    if (quality === "high") {
      maxVotes = faker.number.int({ min: 20, max: 50 });
    } else if (quality === "medium") {
      maxVotes = faker.number.int({ min: 5, max: 20 });
    } else {
      maxVotes = faker.number.int({ min: 0, max: 5 });
    }

    // Ensure we don't try to create more votes than users
    const randomVotes = Math.min(maxVotes, createdUsers.length);

    // Create a set of unique user IDs for voting
    const voterSet = new Set();
    while (voterSet.size < randomVotes) {
      voterSet.add(faker.helpers.arrayElement(createdUsers).id);
    }

    const bounty = await prisma.bounty.create({
      data: {
        title,
        description,
        repoLink: faker.internet.url(),
        notes: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
        status: "ACTIVE",
        hotScore: faker.number.float({ min: 0, max: 100 }),
        user: {
          connect: {
            id: faker.helpers.arrayElement(createdUsers).id,
          },
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        votes: {
          create: Array.from(voterSet).map((userId) => {
            const user = createdUsers.find((u) => u.id === userId)!;
            return {
              userEmail: user.email,
              user: {
                connect: { id: userId },
              },
            };
          }),
        },
      },
    });

    if (Math.random() < 0.25) {
      await generateComments(bounty.id, createdUsers);
    }
  }

  console.log("Seed data created successfully");
}

// Update the generateComments function to use the created users
async function generateComments(bountyId: number, users: User[]) {
  const commentCount = faker.number.int({ min: 0, max: 5 });
  for (let i = 0; i < commentCount; i++) {
    const comment = await prisma.comment.create({
      data: {
        content: faker.lorem.paragraph(),
        author: {
          connect: {
            id: faker.helpers.arrayElement(users).id,
          },
        },
        bounty: {
          connect: {
            id: bountyId,
          },
        },
      },
    });

    const replyCount = faker.number.int({ min: 0, max: 2 });
    for (let j = 0; j < replyCount; j++) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          author: {
            connect: {
              id: faker.helpers.arrayElement(users).id,
            },
          },
          bounty: {
            connect: {
              id: bountyId,
            },
          },
          parent: {
            connect: {
              id: comment.id,
            },
          },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
