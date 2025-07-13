import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.query as string;

  const customers = await prisma.customer.findMany({
    where: {
      name: {
        contains: query,
       // mode: 'insensitive',
      },
    },
  });

  res.status(200).json(customers);
}
