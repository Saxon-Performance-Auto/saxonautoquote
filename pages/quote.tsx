// pages/quote.tsx
import { useState } from 'react';
import SignaturePad from '../components/SignaturePad';

export default function QuoteFormPage() {
  const [customer, setCustomer] = useState({
    name: '', phone: '', email: '', vehicle: '', vin: '', mileageIn: '', mileageOut: ''
  });

  const [quote, setQuote] = useState({
    jobDescription: '', laborCost: '', totalCost: '',
    inspection: '', diagnostics: '', notes: '', signature: ''
  });

  const [parts, setParts] = useState([{ name: '', price: '' }]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuote(prev => ({ ...prev, [name]: value }));
  };

  const handlePartChange = (index: number, field: string, value: string) => {
    const updated = [...parts];
    updated[index][field as keyof typeof updated[0]] = value;
    setParts(updated);
  };

  const addPartRow = () => {
    setParts(prev => [...prev, { name: '', price: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      customer,
      quote,
      parts
    };

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Create Auto Repair Quote</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Customer Name" onChange={handleCustomerChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleCustomerChange} />
          <input name="email" placeholder="Email" onChange={handleCustomerChange} />
          <input name="vehicle" placeholder="Vehicle Info" onChange={handleCustomerChange} />
          <input name="vin" placeholder="VIN" onChange={handleCustomerChange} />
          <input name="mileageIn" placeholder="Mileage In" onChange={handleCustomerChange} />
          <input name="mileageOut" placeholder="Mileage Out" onChange={handleCustomerChange} />
        </div>

        {/* Job / Diagnosis */}
        <textarea name="jobDescription" placeholder="Job Description" onChange={handleQuoteChange} className="min-h-[100px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea name="inspection" placeholder="Inspection Results" onChange={handleQuoteChange} className="min-h-[60px]" />
          <textarea name="diagnostics" placeholder="Diagnostic Summary" onChange={handleQuoteChange} className="min-h-[60px]" />
        </div>

        <textarea name="notes" placeholder="Additional Notes" onChange={handleQuoteChange} className="min-h-[60px]" />

        {/* Parts Table */}
        <div>
          <h2 className="font-semibold mb-2">Parts / Materials</h2>
          <div className="space-y-2">
            {parts.map((p, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  placeholder="Part Name"
                  value={p.name}
                  onChange={(e) => handlePartChange(i, 'name', e.target.value)}
                />
                <input
                  placeholder="Price"
                  type="number"
                  value={p.price}
                  onChange={(e) => handlePartChange(i, 'price', e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={addPartRow} className="text-blue-600 underline">+ Add Another Part</button>
          </div>
        </div>

        {/* Totals / Signature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="laborCost" placeholder="Labor Cost" onChange={handleQuoteChange} />
          <input name="totalCost" placeholder="Total Estimate" onChange={handleQuoteChange} />
        </div>

        <SignaturePad onChange={(sig) => setQuote(prev => ({ ...prev, signature: sig }))} />

        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded mt-4">Submit Quote</button>
      </form>
    </div>
  );
}
