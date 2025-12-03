import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProfile } from '@/contexts/ProfileContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppHeaderProps {
  onNewTransaction?: () => void;
}

export const AppHeader = ({ onNewTransaction }: AppHeaderProps) => {
  const { currentProfile, userName } = useProfile();

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left: Welcome Message (Desktop) */}
        <div className="hidden lg:block">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Olá, {userName}!
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentProfile === 'personal'
              ? 'Aqui está sua fotografia financeira de hoje'
              : 'Visão geral das finanças da empresa'}
          </p>
        </div>

        {/* Mobile Spacer */}
        <div className="w-12 lg:hidden" />

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar transações, projetos..."
              className="pl-10 bg-background/50 border-border/50"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onNewTransaction}
            className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">
              {currentProfile === 'personal' ? 'Nova Transação' : 'Novo Lançamento'}
            </span>
          </Button>

          <Button
            onClick={onNewTransaction}
            size="icon"
            className="sm:hidden bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">Notificações</h3>
              </div>
              <DropdownMenuItem className="p-4 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Conta de luz vence amanhã</p>
                  <p className="text-xs text-muted-foreground">R$ 187,45 - Essenciais</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Orçamento de Alimentação em 80%</p>
                  <p className="text-xs text-muted-foreground">R$ 856,78 de R$ 1.200,00</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
