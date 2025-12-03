export type ProfileType = 'personal' | 'business';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Profile {
  id: string;
  user_id: string;
  type: ProfileType;
  company_name?: string;
}

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  color: string;
  icon: string;
}

export interface Company {
  id: string;
  name: string;
  tax_id: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  date: string;
  category: string;
  category_icon?: string;
  status: 'paid' | 'pending' | 'overdue';
  wallet_id?: string;
  wallet_name?: string;
  company_id?: string;
  project_id?: string;
  project_name?: string;
  supplier_id?: string;
  supplier_name?: string;
  cost_center?: string;
  due_date?: string;
  payment_date?: string;
  attachment_url?: string;
}

export interface Project {
  id: string;
  name: string;
  budget: number;
  spent: number;
  company_id: string;
  status: 'active' | 'completed' | 'paused';
  start_date: string;
  end_date?: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  company_id: string;
  contact?: string;
  total_spent?: number;
}

export interface CostCenter {
  id: string;
  name: string;
  company_id: string;
  budget?: number;
  spent?: number;
}

export interface KPIData {
  label: string;
  value: number;
  change?: number;
  changeType?: 'positive' | 'negative';
  icon: string;
  format?: 'currency' | 'percentage' | 'number';
}

export interface ChartData {
  name: string;
  receitas?: number;
  despesas?: number;
  saldo?: number;
  value?: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  budget: number;
  percentage: number;
  icon: string;
  color: string;
}
