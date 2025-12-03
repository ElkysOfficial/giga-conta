import { useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { personalTransactions, businessTransactions } from '@/data/mockData';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Download, MoreHorizontal, Edit, Trash2, Copy, ShoppingCart, Car, Tv, Zap, Home, Briefcase, Palette, Dumbbell, Building2, Truck, Megaphone, Users, Receipt, Monitor, FileText, Plus } from 'lucide-react';
import { TransactionModal } from '@/components/transactions/TransactionModal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart, Car, Tv, Zap, Home, Briefcase, Palette, Dumbbell, Building2, Truck, Megaphone, Users, Receipt, Monitor, FileText,
};

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  paid: { label: 'Pago', variant: 'default' },
  pending: { label: 'Pendente', variant: 'secondary' },
  overdue: { label: 'Atrasado', variant: 'destructive' },
};

const Transactions = () => {
  const { currentProfile } = useProfile();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const transactions = currentProfile === 'personal' ? personalTransactions : businessTransactions;

  const filteredTransactions = transactions.filter(t => {
    if (typeFilter !== 'all' && t.type !== typeFilter) return false;
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTransactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransactions.map(t => t.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            {currentProfile === 'personal' ? 'Transações' : 'Lançamentos'}
          </h1>
          <p className="text-muted-foreground">
            Gerencie todas as suas {currentProfile === 'personal' ? 'transações' : 'contas a pagar e receber'}
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          {currentProfile === 'personal' ? 'Nova Transação' : 'Novo Lançamento'}
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por descrição..." className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="income">Receitas</SelectItem>
                <SelectItem value="expense">Despesas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="overdue">Atrasado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedIds.length === filteredTransactions.length && filteredTransactions.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction, index) => {
              const Icon = iconMap[transaction.category_icon || 'ShoppingCart'] || ShoppingCart;
              const isIncome = transaction.type === 'income';
              const status = statusLabels[transaction.status];

              return (
                <TableRow 
                  key={transaction.id}
                  className={cn(
                    "hover:bg-muted/30 transition-colors animate-fade-in",
                    index % 2 === 0 && "bg-muted/10"
                  )}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <Checkbox 
                      checked={selectedIds.includes(transaction.id)}
                      onCheckedChange={() => toggleSelect(transaction.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center",
                        isIncome ? 'bg-success/10' : 'bg-muted'
                      )}>
                        <Icon className={cn("w-4 h-4", isIncome ? 'text-success' : 'text-muted-foreground')} />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        {transaction.wallet_name && (
                          <p className="text-xs text-muted-foreground">{transaction.wallet_name}</p>
                        )}
                        {transaction.project_name && (
                          <p className="text-xs text-primary">{transaction.project_name}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{transaction.category}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn("font-semibold", isIncome ? 'text-success' : 'text-destructive')}>
                      {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant} className={cn(
                      status.variant === 'default' && 'bg-success text-success-foreground',
                      status.variant === 'secondary' && 'bg-warning/20 text-warning border-warning/30'
                    )}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" /> Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <TransactionModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Transactions;
