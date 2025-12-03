import { Transaction, Wallet, Project, Supplier, KPIData, ChartData, CategorySpending } from '@/types';

// Personal (PF) Mock Data
export const personalWallets: Wallet[] = [
  { id: '1', name: 'Conta Principal', balance: 8450.00, currency: 'BRL', color: '#2A6FF2', icon: 'Wallet' },
  { id: '2', name: 'Poupança', balance: 15200.00, currency: 'BRL', color: '#1CB85D', icon: 'PiggyBank' },
  { id: '3', name: 'Cartão Nubank', balance: -1250.00, currency: 'BRL', color: '#8B5CF6', icon: 'CreditCard' },
];

export const personalTransactions: Transaction[] = [
  { id: '1', description: 'Salário', amount: 8500.00, type: 'income', date: '2024-01-05', category: 'Salário', category_icon: 'Briefcase', status: 'paid', wallet_id: '1', wallet_name: 'Conta Principal' },
  { id: '2', description: 'Supermercado Extra', amount: 456.78, type: 'expense', date: '2024-01-08', category: 'Alimentação', category_icon: 'ShoppingCart', status: 'paid', wallet_id: '1', wallet_name: 'Conta Principal' },
  { id: '3', description: 'Uber - Viagens', amount: 89.50, type: 'expense', date: '2024-01-10', category: 'Transporte', category_icon: 'Car', status: 'paid', wallet_id: '1', wallet_name: 'Conta Principal' },
  { id: '4', description: 'Netflix', amount: 55.90, type: 'expense', date: '2024-01-12', category: 'Entretenimento', category_icon: 'Tv', status: 'paid', wallet_id: '3', wallet_name: 'Cartão Nubank' },
  { id: '5', description: 'Freelance Design', amount: 1200.00, type: 'income', date: '2024-01-15', category: 'Freelance', category_icon: 'Palette', status: 'paid', wallet_id: '1', wallet_name: 'Conta Principal' },
  { id: '6', description: 'Conta de Luz', amount: 187.45, type: 'expense', date: '2024-01-18', category: 'Essenciais', category_icon: 'Zap', status: 'paid', wallet_id: '1', wallet_name: 'Conta Principal' },
  { id: '7', description: 'Academia Smart Fit', amount: 99.90, type: 'expense', date: '2024-01-20', category: 'Saúde', category_icon: 'Dumbbell', status: 'pending', wallet_id: '3', wallet_name: 'Cartão Nubank' },
  { id: '8', description: 'Aluguel', amount: 2200.00, type: 'expense', date: '2024-01-25', category: 'Moradia', category_icon: 'Home', status: 'pending', wallet_id: '1', wallet_name: 'Conta Principal' },
];

export const personalKPIs: KPIData[] = [
  { label: 'Receitas', value: 9700.00, change: 12.5, changeType: 'positive', icon: 'TrendingUp', format: 'currency' },
  { label: 'Despesas', value: 3089.53, change: -5.2, changeType: 'positive', icon: 'TrendingDown', format: 'currency' },
  { label: 'Saldo Atual', value: 22400.00, change: 8.3, changeType: 'positive', icon: 'Wallet', format: 'currency' },
  { label: 'Orçamento Usado', value: 68.5, change: 15.2, changeType: 'negative', icon: 'PieChart', format: 'percentage' },
];

export const personalChartData: ChartData[] = [
  { name: 'Ago', receitas: 7500, despesas: 5200 },
  { name: 'Set', receitas: 8200, despesas: 4800 },
  { name: 'Out', receitas: 7800, despesas: 5500 },
  { name: 'Nov', receitas: 9100, despesas: 4200 },
  { name: 'Dez', receitas: 12500, despesas: 8200 },
  { name: 'Jan', receitas: 9700, despesas: 3089 },
];

export const personalCategorySpending: CategorySpending[] = [
  { category: 'Alimentação', amount: 856.78, budget: 1200, percentage: 71.4, icon: 'ShoppingCart', color: '#FF8A3D' },
  { category: 'Transporte', amount: 289.50, budget: 400, percentage: 72.4, icon: 'Car', color: '#2A6FF2' },
  { category: 'Lazer', amount: 155.90, budget: 300, percentage: 52.0, icon: 'Gamepad2', color: '#8B5CF6' },
  { category: 'Essenciais', amount: 2387.45, budget: 2800, percentage: 85.3, icon: 'Home', color: '#1CB85D' },
];

// Business (PME) Mock Data
export const businessTransactions: Transaction[] = [
  { id: 'b1', description: 'Pagamento Cliente ABC', amount: 15000.00, type: 'income', date: '2024-01-05', category: 'Receita de Serviços', status: 'paid', project_name: 'Projeto Website', supplier_name: 'Cliente ABC', cost_center: 'Comercial' },
  { id: 'b2', description: 'Fornecedor TechParts', amount: 4500.00, type: 'expense', date: '2024-01-08', category: 'Fornecedores', status: 'paid', supplier_name: 'TechParts Ltda', cost_center: 'Operações', due_date: '2024-01-08', payment_date: '2024-01-08' },
  { id: 'b3', description: 'Aluguel Escritório', amount: 5500.00, type: 'expense', date: '2024-01-10', category: 'Infraestrutura', status: 'pending', cost_center: 'Administrativo', due_date: '2024-01-15' },
  { id: 'b4', description: 'Fatura Cliente XYZ', amount: 8750.00, type: 'income', date: '2024-01-12', category: 'Receita de Serviços', status: 'pending', project_name: 'Consultoria Q1', due_date: '2024-01-20' },
  { id: 'b5', description: 'Marketing Digital', amount: 2800.00, type: 'expense', date: '2024-01-15', category: 'Marketing', status: 'overdue', supplier_name: 'AgênciaMKT', cost_center: 'Marketing', due_date: '2024-01-10' },
  { id: 'b6', description: 'Folha de Pagamento', amount: 28000.00, type: 'expense', date: '2024-01-25', category: 'Pessoal', status: 'pending', cost_center: 'RH', due_date: '2024-01-30' },
];

export const businessProjects: Project[] = [
  { id: 'p1', name: 'Projeto Website Corporativo', budget: 45000, spent: 32500, company_id: '1', status: 'active', start_date: '2024-01-01', end_date: '2024-03-31' },
  { id: 'p2', name: 'Consultoria Estratégica Q1', budget: 25000, spent: 18200, company_id: '1', status: 'active', start_date: '2024-01-15', end_date: '2024-04-15' },
  { id: 'p3', name: 'Implementação ERP', budget: 120000, spent: 45000, company_id: '1', status: 'active', start_date: '2023-11-01', end_date: '2024-06-30' },
  { id: 'p4', name: 'Campanha Lançamento', budget: 15000, spent: 15000, company_id: '1', status: 'completed', start_date: '2023-12-01', end_date: '2024-01-15' },
];

export const businessSuppliers: Supplier[] = [
  { id: 's1', name: 'TechParts Ltda', category: 'Tecnologia', company_id: '1', contact: 'contato@techparts.com', total_spent: 45000 },
  { id: 's2', name: 'AgênciaMKT', category: 'Marketing', company_id: '1', contact: 'atendimento@agenciamkt.com', total_spent: 28000 },
  { id: 's3', name: 'Office Solutions', category: 'Suprimentos', company_id: '1', contact: 'vendas@officesolutions.com', total_spent: 12500 },
  { id: 's4', name: 'CloudServices BR', category: 'Infraestrutura', company_id: '1', contact: 'suporte@cloudservices.com.br', total_spent: 8900 },
];

export const businessKPIs: KPIData[] = [
  { label: 'A Pagar (Hoje)', value: 8300.00, change: 3, changeType: 'negative', icon: 'ArrowUpCircle', format: 'currency' },
  { label: 'A Receber (Hoje)', value: 23750.00, change: 2, changeType: 'positive', icon: 'ArrowDownCircle', format: 'currency' },
  { label: 'Fluxo de Caixa Projetado', value: 45200.00, change: 18.5, changeType: 'positive', icon: 'TrendingUp', format: 'currency' },
  { label: 'Contas Atrasadas', value: 2800.00, change: 1, changeType: 'negative', icon: 'AlertTriangle', format: 'currency' },
];

export const businessChartData: ChartData[] = [
  { name: 'Ago', receitas: 85000, despesas: 62000 },
  { name: 'Set', receitas: 92000, despesas: 71000 },
  { name: 'Out', receitas: 78000, despesas: 68000 },
  { name: 'Nov', receitas: 105000, despesas: 75000 },
  { name: 'Dez', receitas: 125000, despesas: 88000 },
  { name: 'Jan', receitas: 98000, despesas: 72000 },
];

export const costCenterData: ChartData[] = [
  { name: 'Operações', value: 35000 },
  { name: 'Marketing', value: 18000 },
  { name: 'Administrativo', value: 12000 },
  { name: 'RH', value: 28000 },
  { name: 'TI', value: 15000 },
];

export const categories = {
  personal: [
    { value: 'alimentacao', label: 'Alimentação', icon: 'ShoppingCart' },
    { value: 'transporte', label: 'Transporte', icon: 'Car' },
    { value: 'moradia', label: 'Moradia', icon: 'Home' },
    { value: 'saude', label: 'Saúde', icon: 'Heart' },
    { value: 'educacao', label: 'Educação', icon: 'GraduationCap' },
    { value: 'lazer', label: 'Lazer', icon: 'Gamepad2' },
    { value: 'essenciais', label: 'Essenciais', icon: 'Zap' },
    { value: 'salario', label: 'Salário', icon: 'Briefcase' },
    { value: 'freelance', label: 'Freelance', icon: 'Palette' },
    { value: 'investimentos', label: 'Investimentos', icon: 'TrendingUp' },
  ],
  business: [
    { value: 'servicos', label: 'Receita de Serviços', icon: 'Briefcase' },
    { value: 'fornecedores', label: 'Fornecedores', icon: 'Truck' },
    { value: 'infraestrutura', label: 'Infraestrutura', icon: 'Building2' },
    { value: 'marketing', label: 'Marketing', icon: 'Megaphone' },
    { value: 'pessoal', label: 'Pessoal', icon: 'Users' },
    { value: 'impostos', label: 'Impostos', icon: 'Receipt' },
    { value: 'tecnologia', label: 'Tecnologia', icon: 'Monitor' },
    { value: 'consultoria', label: 'Consultoria', icon: 'FileText' },
  ],
};
