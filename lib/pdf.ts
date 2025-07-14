import type { NextApiResponse } from 'next';
import type { Quote, Customer, Part } from './types';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export default async function generatePDF(
  res: NextApiResponse,
  quote: Quote,
  customer: Customer,
  parts: Part[]
) {
  const doc = new PDFDocument();
  const filePath = path.join(process.cwd(), 'public', `quote-${quote.id}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('Quote Summary', { underline: true });
  doc.moveDown();

  doc.fontSize(12).text(`Customer: ${customer.name}`);
  doc.text(`Phone: ${customer.phone}`);
  doc.text(`Email: ${customer.email || ''}`);
  doc.text(`Vehicle: ${customer.vehicle}`);
  doc.text(`VIN: ${customer.vin || ''}`);
  doc.text(`Mileage In: ${customer.mileageIn || ''}`);
  doc.text(`Mileage Out: ${customer.mileageOut || ''}`);
  doc.moveDown();

  doc.fontSize(14).text('Job Description');
  doc.fontSize(12).text(quote.jobDescription);
  doc.moveDown();

  doc.fontSize(14).text('Parts');
  parts.forEach((part) => {
    doc.fontSize(12).text(`${part.name} - $${part.price.toFixed(2)}`);
  });
  doc.moveDown();

  doc.fontSize(12).text(`Labor Cost: $${quote.laborCost.toFixed(2)}`);
  doc.fontSize(12).text(`Total Cost: $${quote.totalCost.toFixed(2)}`);
  doc.moveDown();

  if (quote.notes) {
    doc.fontSize(14).text('Notes');
    doc.fontSize(12).text(quote.notes);
  }

  doc.end();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=quote-${quote.id}.pdf`);
  const fileBuffer = fs.readFileSync(filePath);
  res.send(fileBuffer);
}

