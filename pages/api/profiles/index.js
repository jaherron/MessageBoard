import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const profiles = await prisma.profile.findMany();
    res.status(200).json(profiles);
  } else if (req.method === 'POST') {
    const profile = req.body;
    const newProfile = await prisma.profile.create({
      data: profile,
    });
    res.status(200).json(newProfile);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}