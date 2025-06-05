import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, email, vehicle, jobDescription, laborCost, parts } = req.body;

    // Step 1: Find or create customer
    let customer = await prisma.customer.findUnique({ where: { phone } });

    if (!customer) {
      customer = await prisma.customer.create({
        data: { name, phone, email, vehicle },
      });
    }

    // Step 2: Create quote
    const quote = await prisma.quote.create({
      data: {
        customer_id: customer.id,
        job_description: jobDescription,
        labor_cost: parseFloat(laborCost),
        total_cost: parts.reduce((sum: number, p: any) => sum + parseFloat(p.part_price), 0) + parseFloat(laborCost),
      },
    });

    // Step 3: Add parts
    for (const part of parts) {
      await prisma.part.create({
        data: {
          quote_id: quote.id,
          part_name: part.part_name,
          part_price: parseFloat(part.part_price),
        },
      });
    }

    return res.status(200).json({ message: 'Quote created successfully', quoteId: quote.id });
  } catch (error) {
    console.error('Submit API error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
