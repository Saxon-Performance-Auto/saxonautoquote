import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { name, phone, email, vehicle, jobDescription, laborCost, parts } = req.body;

  try {
    // Check if customer already exists by phone
    let customer = await prisma.customer.findFirst({ where: { phone } });
    if (!customer) {
      customer = await prisma.customer.create({
        data: { name, phone, email, vehicle }
      });
    }

    const totalPartsCost = parts.reduce((sum, p) => sum + parseFloat(p.price), 0);
    const totalCost = totalPartsCost + parseFloat(laborCost);

    const quote = await prisma.quote.create({
      data: {
        customerId: customer.id,
        jobDescription,
        laborCost: parseFloat(laborCost),
        totalCost,
        parts: {
          create: parts.map(p => ({ name: p.name, price: parseFloat(p.price) }))
        }
      }
    });

    res.status(200).json({ message: 'Quote saved successfully', quoteId: quote.id });
  } catch (error) {
    console.error('Error saving quote:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
