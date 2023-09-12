import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  const product = await prisma.product.upsert({
    where: { upc: "1234567890"},
    update: {},
    create: {
      upc: "1234567890",
      location: "4B-10-5"
    }
  });

  console.log({ product })
}

run()
.catch((e) => {
  console.log(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect()
})