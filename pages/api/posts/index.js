import { prisma } from '../../../lib/prisma';

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