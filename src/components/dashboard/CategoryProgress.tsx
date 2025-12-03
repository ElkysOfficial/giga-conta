import { CategorySpending } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { ShoppingCart, Car, Home, Gamepad2, Zap, Heart, GraduationCap, Briefcase } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Car,
  Home,
  Gamepad2,
  Zap,
  Heart,
  GraduationCap,
  Briefcase,
};

interface CategoryProgressProps {
  data: CategorySpending[];
}

export const CategoryProgress = ({ data }: CategoryProgressProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card animate-fade-in">
      <h3 className="text-lg font-display font-semibold text-foreground mb-6">Resumo do Mês</h3>
      <div className="space-y-5">
        {data.map((item, index) => {
          const Icon = iconMap[item.icon] || ShoppingCart;
          const isOverBudget = item.percentage > 100;
          const isNearLimit = item.percentage >= 80 && item.percentage <= 100;
          
          return (
            <div key={item.category} className="space-y-2" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="font-medium text-foreground">{item.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {formatCurrency(item.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    de {formatCurrency(item.budget)}
                  </p>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={Math.min(item.percentage, 100)} 
                  className="h-2"
                  style={{ 
                    ['--progress-background' as any]: isOverBudget 
                      ? 'hsl(var(--destructive))' 
                      : isNearLimit 
                        ? 'hsl(var(--warning))' 
                        : item.color 
                  }}
                />
                <span className="absolute right-0 -top-5 text-xs text-muted-foreground">
                  {formatPercentage(item.percentage)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
