// pages/api/search.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const query = req.query.query as string;

  const customers = await prisma.customer.findMany({
    where: {
      OR: [
        { phone: { contains: query } },
        { name: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      quotes: true,
    },
  });

  res.status(200).json({ customers });
}
