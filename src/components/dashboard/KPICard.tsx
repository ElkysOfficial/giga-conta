import { cn } from '@/lib/utils';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { KPIData } from '@/types';
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpCircle, ArrowDownCircle, AlertTriangle } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
};

interface KPICardProps {
  data: KPIData;
  index?: number;
}

export const KPICard = ({ data, index = 0 }: KPICardProps) => {
  const Icon = iconMap[data.icon] || Wallet;
  const formattedValue = data.format === 'currency' 
    ? formatCurrency(data.value) 
    : data.format === 'percentage' 
      ? formatPercentage(data.value)
      : data.value.toString();

  const isPositiveChange = data.changeType === 'positive';
  
  return (
    <div 
      className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          data.icon === 'AlertTriangle' ? 'bg-destructive/10' : 'bg-primary/10'
        )}>
          <Icon className={cn(
            "w-6 h-6",
            data.icon === 'AlertTriangle' ? 'text-destructive' : 'text-primary'
          )} />
        </div>
        {data.change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
            isPositiveChange 
              ? 'bg-success/10 text-success' 
              : 'bg-destructive/10 text-destructive'
          )}>
            {isPositiveChange ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(data.change)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{data.label}</p>
        <p className={cn(
          "text-2xl font-display font-semibold",
          data.icon === 'AlertTriangle' ? 'text-destructive' : 'text-foreground'
        )}>
          {formattedValue}
        </p>
      </div>
    </div>
  );
};
