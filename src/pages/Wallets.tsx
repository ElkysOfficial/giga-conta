import { personalWallets } from '@/data/mockData';
import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Edit, Trash2, Wallet, PiggyBank, CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  PiggyBank,
  CreditCard,
};

const Wallets = () => {
  const totalBalance = personalWallets.reduce((acc, w) => acc + w.balance, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground">Carteiras</h1>
          <p className="text-muted-foreground">
            Gerencie suas contas e carteiras
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Carteira
        </Button>
      </div>

      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-primary-foreground shadow-lg">
        <p className="text-primary-foreground/80 mb-1">Patrimônio Total</p>
        <p className="text-4xl font-display font-bold">{formatCurrency(totalBalance)}</p>
        <p className="text-sm text-primary-foreground/60 mt-2">
          {personalWallets.length} carteira{personalWallets.length !== 1 && 's'} ativa{personalWallets.length !== 1 && 's'}
        </p>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {personalWallets.map((wallet, index) => {
          const Icon = iconMap[wallet.icon] || Wallet;
          const isNegative = wallet.balance < 0;

          return (
            <div 
              key={wallet.id}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${wallet.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: wallet.color }} />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-4">
                <h3 className="font-display font-semibold text-foreground text-lg">{wallet.name}</h3>
                <p className="text-xs text-muted-foreground">{wallet.currency}</p>
              </div>

              <p className={cn(
                "text-3xl font-display font-bold mb-6",
                isNegative ? 'text-destructive' : 'text-foreground'
              )}>
                {formatCurrency(wallet.balance)}
              </p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <ArrowUpRight className="w-4 h-4 text-success" />
                  Entrada
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <ArrowDownLeft className="w-4 h-4 text-destructive" />
                  Saída
                </Button>
              </div>
            </div>
          );
        })}

        {/* Add Wallet Card */}
        <div className="bg-card/50 border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] hover:border-primary/50 hover:bg-card transition-all cursor-pointer group">
          <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <Plus className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Adicionar Carteira
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
