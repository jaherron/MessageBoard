import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// For PostgreSQL using the pg driver:
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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