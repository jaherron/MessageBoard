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
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const post = req.body;
    const newPost = await prisma.post.create({
      data: post,
    });
    res.status(200).json(newPost);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}