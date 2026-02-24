import { prisma } from "./prisma";

async function main() {
  // Just a simple query to check if the DB connection works
  const count = await prisma.user.count();
  console.log("DB connected ✅ user count =", count);
}

main()
  .catch((e) => {
    console.error("DB test failed ❌", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });