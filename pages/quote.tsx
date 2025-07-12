import { useState, useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

export default function QuoteFormPage() {
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', vehicle: '', vin: '', mileageIn: '', mileageOut: '' });
  const [quote, setQuote] = useState({ jobDescription: '', laborCost: '', totalCost: '', inspection: '', diagnostics: '', notes: '', signature: '' });
  const [parts, setParts] = useState([{ name: '', price: '' }]);
  const sigPadRef = useRef<SignaturePad | null>(null);

  const handleCustomerChange = (e: any) => setCustomer({ ...customer, [e.target.name]: e.target.value });
  const handleQuoteChange = (e: any) => setQuote({ ...quote, [e.target.name]: e.target.value });

  const handlePartChange = (i: number, key: string, value: string) => {
    const updated = [...parts];
    updated[i][key as keyof typeof updated[0]] = value;
    setParts(updated);
  };

  const addPartRow = () => setParts([...parts, { name: '', price: '' }]);
  const clearSignature = () => sigPadRef.current?.clear();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const signature = sigPadRef.current?.isEmpty() ? '' : sigPadRef.current?.getTrimmedCanvas().toDataURL();

    const payload = { customer, quote: { ...quote, signature }, parts };

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Auto Repair Quote</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['name', 'phone', 'email', 'vehicle', 'vin', 'mileageIn', 'mileageOut'].map((field) => (
            <input key={field} name={field} placeholder={field.replace(/([A-Z])/g, ' $1')} className="border p-2" onChange={handleCustomerChange} />
          ))}
        </div>

        <textarea name="jobDescription" placeholder="Job Description" className="border p-2 w-full min-h-[80px]" onChange={handleQuoteChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea name="inspection" placeholder="Inspection Results" className="border p-2 min-h-[60px]" onChange={handleQuoteChange} />
          <textarea name="diagnostics" placeholder="Diagnostic Summary" className="border p-2 min-h-[60px]" onChange={handleQuoteChange} />
        </div>
        <textarea name="notes" placeholder="Additional Notes" className="border p-2 w-full min-h-[60px]" onChange={handleQuoteChange} />

        <h2 className="font-semibold mt-6 mb-2">Parts</h2>
        {parts.map((part, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input className="border p-2" placeholder="Part Name" value={part.name} onChange={e => handlePartChange(i, 'name', e.target.value)} />
            <input className="border p-2" placeholder="Price" value={part.price} onChange={e => handlePartChange(i, 'price', e.target.value)} type="number" />
          </div>
        ))}
        <button type="button" onClick={addPartRow} className="text-blue-600 underline">+ Add Part</button>

        <div className="grid grid-cols-2 gap-4">
          <input name="laborCost" placeholder="Labor Cost" className="border p-2" onChange={handleQuoteChange} />
          <input name="totalCost" placeholder="Total Estimate" className="border p-2" onChange={handleQuoteChange} />
        </div>

        <div className="my-4">
          <p className="font-semibold mb-2">Customer Signature</p>
          <SignaturePad ref={sigPadRef} canvasProps={{ className: "border w-full h-32" }} />
          <button type="button" onClick={clearSignature} className="text-sm mt-2 text-red-500 underline">Clear Signature</button>
        </div>

        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded">Submit Quote</button>
      </form>
    </div>
  );
}
