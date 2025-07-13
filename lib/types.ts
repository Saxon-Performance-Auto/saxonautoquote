export type Quote = {
  id: number;
  customer_id: string;
  job_description: string;
  labor_cost: number;
  total_cost: number;
  createdAt: Date;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
};

export type Part = {
  id?: number;
  quote_id: number;
  part_name: string;
  part_price: number;
};
