import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AlertsCardProps {
  transactions: Transaction[];
}

export const AlertsCard = ({ transactions }: AlertsCardProps) => {
  const overdueTransactions = transactions.filter(t => t.status === 'overdue');
  const pendingTransactions = transactions.filter(t => t.status === 'pending' && t.due_date);

  if (overdueTransactions.length === 0 && pendingTransactions.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card animate-fade-in border-l-4 border-l-warning">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>
        <h3 className="text-lg font-display font-semibold text-foreground">Alertas</h3>
      </div>

      <div className="space-y-3">
        {overdueTransactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <div>
                <p className="font-medium text-foreground text-sm">{transaction.description}</p>
                <p className="text-xs text-destructive">
                  Vencido em {formatDate(transaction.due_date!)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-destructive">{formatCurrency(transaction.amount)}</p>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-primary">
                Pagar <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}

        {pendingTransactions.slice(0, 3).map((transaction) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-xl bg-warning/5 border border-warning/20"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-warning" />
              <div>
                <p className="font-medium text-foreground text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  Vence em {formatDate(transaction.due_date!)}
                </p>
              </div>
            </div>
            <p className="font-semibold text-foreground">{formatCurrency(transaction.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
