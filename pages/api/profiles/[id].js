import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_PRISMA_URL,
})

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const deletedProfile = await prisma.profile.delete({
                where: { id: id },
            });
            res.status(200).json(deletedProfile);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete profile' });
        }
    } else if (req.method === 'PUT') {
        const profile = req.body;
        try {
            const updatedProfile = await prisma.profile.update({
                where: { id: id },
                data: profile,
            });
            res.status(200).json(updatedProfile);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update profile' });
        }
    } else if (req.method === 'GET') {
        const profile = await prisma.profile.findUnique({
            where: { id: id },
        });
        if (profile === null) {
            res.status(404).end(); // Not Found
        } else {
            res.status(200).json(profile);
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}