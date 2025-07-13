// pages/api/submit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { customer, quote, parts } = req.body;

    const newCustomer = await prisma.customer.create({
      data: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        vehicle: customer.vehicle,
        vin: customer.vin,
        mileageIn: customer.mileageIn,
        mileageOut: customer.mileageOut,
      },
    });

    const newQuote = await prisma.quote.create({
      data: {
        customerId: newCustomer.id,
        jobDescription: quote.jobDescription,
        inspection: quote.inspection,
        diagnostics: quote.diagnostics,
        laborCost: parseFloat(quote.laborCost),
        totalCost: parseFloat(quote.totalCost),
        notes: quote.notes,
        signature: quote.signature,
      },
    });

    await Promise.all(
      parts.map((part: { name: string; price: number }) =>
        prisma.part.create({
          data: {
            quoteId: newQuote.id,
            name: part.name,
            price: parseFloat(part.price as unknown as string),
          },
        })
      )
    );

    return res.status(200).json({ message: 'Quote submitted successfully' });
  } catch (error: any) {
    console.error('[submit.ts error]', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
