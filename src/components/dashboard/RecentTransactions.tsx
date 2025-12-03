import { Transaction } from '@/types';
import { formatCurrency, formatDateShort } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit, Copy, Trash2, ShoppingCart, Car, Tv, Zap, Home, Briefcase, Palette, Dumbbell, Building2, Truck, Megaphone, Users, Receipt, Monitor, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Car,
  Tv,
  Zap,
  Home,
  Briefcase,
  Palette,
  Dumbbell,
  Building2,
  Truck,
  Megaphone,
  Users,
  Receipt,
  Monitor,
  FileText,
};

interface RecentTransactionsProps {
  transactions: Transaction[];
  showWallet?: boolean;
}

export const RecentTransactions = ({ transactions, showWallet = true }: RecentTransactionsProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-foreground">Transações Recentes</h3>
        <Link to="/transacoes">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            Ver todas
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {transactions.slice(0, 5).map((transaction, index) => {
          const Icon = iconMap[transaction.category_icon || 'ShoppingCart'] || ShoppingCart;
          const isIncome = transaction.type === 'income';
          
          return (
            <div 
              key={transaction.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center",
                isIncome ? 'bg-success/10' : 'bg-muted'
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  isIncome ? 'text-success' : 'text-muted-foreground'
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{transaction.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatDateShort(transaction.date)}</span>
                  {showWallet && transaction.wallet_name && (
                    <>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {transaction.wallet_name}
                      </span>
                    </>
                  )}
                  {transaction.project_name && (
                    <>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {transaction.project_name}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "font-semibold",
                  isIncome ? 'text-success' : 'text-destructive'
                )}>
                  {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>
    </div>
  );
};
