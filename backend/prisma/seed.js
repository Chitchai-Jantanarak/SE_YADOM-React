// prisma/seed.js

import { PrismaClient } from '@prisma/client';  // Use import instead of require
import bcrypt from 'bcryptjs';  // If needed for hashing

const prisma = new PrismaClient();

async function main() {
  // Create some example Products
  await prisma.product.createMany({
    data: [
      { name: 'Model 1', modelURL: 'http://localhost:3000/model1.gltf', description: 'A cool 3D model' },
      { name: 'Model 2', modelURL: 'http://localhost:3000/model2.gltf', description: 'Another cool model' },
    ],
  });

  // Create an example User with a hashed password (if necessary)
  const hashedPassword = bcrypt.hashSync('yourPassword', 10);

  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,  // Using hashed password
      role: 'admin',  // Or 'user'
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
