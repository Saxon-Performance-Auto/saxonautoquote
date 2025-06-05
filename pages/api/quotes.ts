import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const quotes = await prisma.quote.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(quotes);
  } catch (err) {
    console.error('Error in /api/quotes:', err);
    return res.status(500).json({ message: 'Failed to load quotes' });
  }
}