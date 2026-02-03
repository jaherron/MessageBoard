import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const deletedPost = await prisma.post.delete({
                where: { id: id },
            });
            res.status(200).json(deletedPost);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete post' });
        }
    } else if (req.method === 'PUT') {
        const post = req.body;
        try {
            const updatedPost = await prisma.post.update({
                where: { id: id },
                data: post,
            });
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update post' });
        }
    } else if (req.method === 'GET') {
        const post = await prisma.post.findUnique({
            where: { id: id },
        });
        if (post === null) {
            res.status(404).end(); // Not Found
        } else {
            res.status(200).json(post);
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}