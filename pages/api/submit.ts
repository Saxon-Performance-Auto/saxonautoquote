import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CustomerInput = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  vin: string;
  mileageIn: string;
  mileageOut: string;
};

type QuoteInput = {
  jobDescription: string;
  inspection: string;
  diagnostics: string;
  notes: string;
  laborCost: string;
  totalCost: string;
  signature: string;
};

type PartInput = {
  name: string;
  price: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { customer, quote, parts }: {
      customer: CustomerInput;
      quote: QuoteInput;
      parts: PartInput[];
    } = req.body;

    const createdCustomer = await prisma.customer.create({
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

    const createdQuote = await prisma.quote.create({
      data: {
        customerId: createdCustomer.id,
        jobDescription: quote.jobDescription,
        inspection: quote.inspection,
        diagnostics: quote.diagnostics,
        notes: quote.notes,
        laborCost: parseFloat(quote.laborCost || '0'),
        totalCost: parseFloat(quote.totalCost || '0'),
        signature: quote.signature,
        parts: {
          create: parts.map((p: PartInput) => ({
            name: p.name,
            price: parseFloat(p.price || '0'),
          })),
        },
      },
    });

    res.status(200).json({ message: 'Quote saved successfully', quoteId: createdQuote.id });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ message: 'Failed to save quote' });
  }
}
