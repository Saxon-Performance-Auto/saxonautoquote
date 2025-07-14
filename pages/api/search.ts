import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = String(req.query.q || '');

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const results = await prisma.customer.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 10,
    });

    res.status(200).json(results);
  } catch (err) {
    console.error('Search API error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

