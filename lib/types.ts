export type Quote = {
  id: number;
  job_description: string;
  laborCost: number;
  totalCost: number;
  inspection?: string | null;
  diagnostics?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  customerId: number;
};

export type Customer = {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  vehicle: string;
  vin?: string | null;
  mileageIn?: string | null;
  mileageOut?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Part = {
  id: number;
  partName: string;
  price: number;
  quoteId: number;
  createdAt: Date;
  updatedAt: Date;
};
