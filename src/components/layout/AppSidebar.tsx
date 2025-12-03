import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useProfile } from '@/contexts/ProfileContext';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  FolderKanban,
  BarChart3,
  Settings,
  Building2,
  User,
  ChevronDown,
  Check,
  Menu,
  X,
  Target,
  Users,
  Truck,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const personalMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ArrowLeftRight, label: 'Transações', path: '/transacoes' },
  { icon: Wallet, label: 'Carteiras', path: '/carteiras' },
  { icon: Target, label: 'Orçamento', path: '/orcamento' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

const businessMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ArrowLeftRight, label: 'Lançamentos', path: '/transacoes' },
  { icon: FolderKanban, label: 'Projetos', path: '/projetos' },
  { icon: Truck, label: 'Fornecedores', path: '/fornecedores' },
  { icon: Users, label: 'Centros de Custo', path: '/centros-custo' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

export const AppSidebar = () => {
  const { currentProfile, setCurrentProfile, companyName, userName } = useProfile();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = currentProfile === 'personal' ? personalMenuItems : businessMenuItems;

  const ProfileSwitcher = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors text-left">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            {currentProfile === 'personal' ? (
              <User className="w-5 h-5 text-primary-foreground" />
            ) : (
              <Building2 className="w-5 h-5 text-primary-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {currentProfile === 'personal' ? 'Pessoal' : companyName}
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              {currentProfile === 'personal' ? 'Conta Pessoal' : 'Empresa'}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-sidebar-foreground/60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[220px]">
        <DropdownMenuItem onClick={() => setCurrentProfile('personal')} className="gap-3 py-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Pessoal</p>
            <p className="text-xs text-muted-foreground">Conta Pessoal</p>
          </div>
          {currentProfile === 'personal' && <Check className="w-4 h-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentProfile('business')} className="gap-3 py-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{companyName}</p>
            <p className="text-xs text-muted-foreground">Empresa</p>
          </div>
          {currentProfile === 'business' && <Check className="w-4 h-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const NavItems = () => (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
                : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
            )
          }
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card shadow-card"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar flex flex-col z-50 transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-display font-semibold text-sidebar-foreground">
                Easy Budget
              </h1>
              <p className="text-xs text-sidebar-foreground/60">Gestão Financeira</p>
            </div>
          </div>
        </div>

        {/* Profile Switcher */}
        <div className="p-4">
          <ProfileSwitcher />
        </div>

        {/* Navigation */}
        <NavItems />

        {/* User Info */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-foreground">
                {userName.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
              <p className="text-xs text-sidebar-foreground/60">Plano Pro</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
