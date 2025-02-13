const { PrismaClient } = require('@prisma/client');
const logger = require('../../src/config/logger');

const prisma = new PrismaClient();

async function main() {
  await prisma.category.create({
    data: {
      name: 'Electronics',
    },
  });

  await prisma.category.create({
    data: {
      name: 'Books',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Fitra',
      email: 'fitra@gmail.com',
      password: '$2b$10$4uk.wCJvhIkrVUWga1HPk.voHd5L53sjGnohFDKr1ZVIlwPTeW9Xm', // password
      role: 'user',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Ilyasa',
      email: 'ilyasa@gmail.com',
      password: '$2b$10$4uk.wCJvhIkrVUWga1HPk.voHd5L53sjGnohFDKr1ZVIlwPTeW9Xm', // password
      role: 'admin',
    },
  });

  logger.info('Seed data created!');
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
