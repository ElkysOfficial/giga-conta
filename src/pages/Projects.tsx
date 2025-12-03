import { businessProjects } from '@/data/mockData';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Edit, Trash2, FolderKanban, Calendar, TrendingUp, Pause, CheckCircle } from 'lucide-react';

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  active: { label: 'Ativo', color: 'bg-success/10 text-success border-success/30', icon: TrendingUp },
  completed: { label: 'Concluído', color: 'bg-primary/10 text-primary border-primary/30', icon: CheckCircle },
  paused: { label: 'Pausado', color: 'bg-warning/10 text-warning border-warning/30', icon: Pause },
};

const Projects = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground">Projetos</h1>
          <p className="text-muted-foreground">
            Acompanhe o orçamento e os gastos de cada projeto
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {businessProjects.map((project, index) => {
          const percentage = (project.spent / project.budget) * 100;
          const isOverBudget = percentage > 100;
          const isNearLimit = percentage >= 80 && percentage <= 100;
          const status = statusConfig[project.status];
          const StatusIcon = status.icon;

          return (
            <div 
              key={project.id}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground line-clamp-1">
                      {project.name}
                    </h3>
                    <Badge variant="outline" className={cn("text-xs", status.color)}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                </div>
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
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Budget Info */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Orçado</span>
                  <span className="font-semibold text-foreground">{formatCurrency(project.budget)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Realizado</span>
                  <span className={cn(
                    "font-semibold",
                    isOverBudget ? 'text-destructive' : isNearLimit ? 'text-warning' : 'text-foreground'
                  )}>
                    {formatCurrency(project.spent)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-3"
                    style={{
                      ['--progress-background' as any]: isOverBudget 
                        ? 'hsl(var(--destructive))' 
                        : isNearLimit 
                          ? 'hsl(var(--warning))' 
                          : 'hsl(var(--primary))'
                    }}
                  />
                  <div className="flex justify-between text-xs">
                    <span className={cn(
                      "font-medium",
                      isOverBudget ? 'text-destructive' : isNearLimit ? 'text-warning' : 'text-primary'
                    )}>
                      {formatPercentage(percentage)} usado
                    </span>
                    <span className="text-muted-foreground">
                      Saldo: {formatCurrency(Math.max(project.budget - project.spent, 0))}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(project.start_date).toLocaleDateString('pt-BR')}
                    {project.end_date && ` - ${new Date(project.end_date).toLocaleDateString('pt-BR')}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
