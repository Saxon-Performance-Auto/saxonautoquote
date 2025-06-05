import { useState } from 'react';

export default function QuoteFormPage() {
  const [repairs, setRepairs] = useState([{ description: '', parts: '', labor: '', refinish: '', sublet: '' }]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const [form, setForm] = useState({
    name: '', phone: '', date: '', street: '', city: '', color: '', make: '', model: '',
    reg: '', serial: '', odometer: '', insurance: '', adjuster: '', estimator: '', notes: '', signature: ''
  });

  const addRepairRow = () => setRepairs([...repairs, { description: '', parts: '', labor: '', refinish: '', sublet: '' }]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Estimate of Auto Repairs</h1>

      {/* Company & Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" placeholder="Customer Name" className="border p-2" onChange={handleChange} />
        <input name="phone" placeholder="Phone" className="border p-2" onChange={handleChange} />
        <input name="date" placeholder="Date (MM/DD/YYYY)" className="border p-2" onChange={handleChange} />
        <input name="street" placeholder="Street Address" className="border p-2" onChange={handleChange} />
        <input name="city" placeholder="City" className="border p-2" onChange={handleChange} />
        <input name="color" placeholder="Color" className="border p-2" onChange={handleChange} />
        <input name="make" placeholder="Make" className="border p-2" onChange={handleChange} />
        <input name="model" placeholder="Model" className="border p-2" onChange={handleChange} />
        <input name="reg" placeholder="Registration #" className="border p-2" onChange={handleChange} />
        <input name="serial" placeholder="Serial #" className="border p-2" onChange={handleChange} />
        <input name="odometer" placeholder="Odometer" className="border p-2" onChange={handleChange} />
        <input name="insurance" placeholder="Insurance Company" className="border p-2" onChange={handleChange} />
        <input name="adjuster" placeholder="Adjuster Name" className="border p-2" onChange={handleChange} />
        <input name="estimator" placeholder="Estimated By" className="border p-2" onChange={handleChange} />
      </div>

      {/* Repair Grid */}
      <div>
        <h2 className="font-semibold">Repair Estimate</h2>
        <table className="w-full border mt-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Description</th>
              <th className="border p-2">Parts</th>
              <th className="border p-2">Labor</th>
              <th className="border p-2">Refinish</th>
              <th className="border p-2">Sublet</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((r, idx) => (
              <tr key={idx}>
                <td><input className="w-full border p-2" value={r.description} onChange={e => {
                  const newList = [...repairs]; newList[idx].description = e.target.value; setRepairs(newList);
                }} /></td>
                <td><input className="w-full border p-2" value={r.parts} onChange={e => {
                  const newList = [...repairs]; newList[idx].parts = e.target.value; setRepairs(newList);
                }} /></td>
                <td><input className="w-full border p-2" value={r.labor} onChange={e => {
                  const newList = [...repairs]; newList[idx].labor = e.target.value; setRepairs(newList);
                }} /></td>
                <td><input className="w-full border p-2" value={r.refinish} onChange={e => {
                  const newList = [...repairs]; newList[idx].refinish = e.target.value; setRepairs(newList);
                }} /></td>
                <td><input className="w-full border p-2" value={r.sublet} onChange={e => {
                  const newList = [...repairs]; newList[idx].sublet = e.target.value; setRepairs(newList);
                }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRepairRow} className="mt-2 text-blue-600 underline">+ Add Another Row</button>
      </div>

      {/* Notes */}
      <textarea name="notes" className="border w-full p-2 min-h-[100px]" placeholder="Additional notes..." onChange={handleChange}></textarea>

      {/* Signature */}
      <div className="grid grid-cols-2 gap-4">
        <input name="signature" className="border p-2" placeholder="Customer Signature (typed name)" onChange={handleChange} />
        <input name="date" className="border p-2" placeholder="Date" onChange={handleChange} />
      </div>

      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">Submit Quote</button>
    </div>
  );
}