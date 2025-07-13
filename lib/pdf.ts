
<<<<<<< HEAD
import type { Quote, Customer, Part } from './types';
=======
import { Quote, Customer, Part } from '@prisma/client';
>>>>>>> 24386c5 (added files)
import PDFDocument from 'pdfkit';
import { NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export async function generateInvoicePDF(
  res: NextApiResponse,
  customer: Customer,
  quote: Quote,
  parts: Part[]
) {
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="invoice.pdf"');
  doc.pipe(res);

  const logoPath = path.join(process.cwd(), 'public', 'saxonlogo.png');
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, { width: 120, align: 'center' });
  }

  doc.moveDown();
  doc.fontSize(20).fillColor('#C8102E').text('SAXON PERFORMANCE AUTO', { align: 'center' });
  doc.fontSize(12).fillColor('#000').text('Mobile Mechanic & Diagnostics', { align: 'center' });
  doc.moveDown().moveDown();

  doc.fontSize(12).text(`Date: ${new Date(quote.createdAt).toLocaleDateString()}`);
  doc.text(`Customer: ${customer.name}`);
  doc.text(`Phone: ${customer.phone}`);
  doc.text(`Email: ${customer.email}`);
  doc.text(`Vehicle: ${customer.vehicle}`);
  doc.moveDown();

  doc.fontSize(14).fillColor('#000').text('Job Description');
  doc.fontSize(12).text(quote.job_description);
  doc.moveDown();

  doc.fontSize(14).fillColor('#000').text('Parts');
  parts.forEach(part => {
    doc.text(`- ${part.part_name}: $${part.part_price.toFixed(2)}`);
  });

  const partsTotal = parts.reduce((sum, part) => sum + part.part_price, 0);
  const totalCost = partsTotal + quote.labor_cost;

  doc.moveDown();
  doc.text(`Labor: $${quote.labor_cost.toFixed(2)}`);
  doc.fontSize(14).fillColor('#C8102E').text(`Total Estimate: $${totalCost.toFixed(2)}`, { align: 'right' });

  doc.moveDown().moveDown();
  doc.fontSize(10).fillColor('#555').text('Note: This is a preliminary quote. Final pricing may vary.');

  doc.end();
}
