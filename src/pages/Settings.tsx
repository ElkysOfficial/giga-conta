import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useProfile } from '@/contexts/ProfileContext';
import { User, Building2, Bell, Shield, Palette, LogOut } from 'lucide-react';

const Settings = () => {
  const { currentProfile, userName, companyName } = useProfile();

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-card rounded-2xl p-6 shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground">Perfil Pessoal</h2>
            <p className="text-sm text-muted-foreground">Informações da sua conta</p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" defaultValue={userName} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" defaultValue="maria@email.com" />
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Salvar Alterações</Button>
      </div>

      {/* Company Section (PME Only) */}
      {currentProfile === 'business' && (
        <div className="bg-card rounded-2xl p-6 shadow-card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground">Dados da Empresa</h2>
              <p className="text-sm text-muted-foreground">Informações empresariais</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Razão Social</Label>
              <Input id="company" defaultValue={companyName} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" defaultValue="12.345.678/0001-00" />
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Salvar Alterações</Button>
        </div>
      )}

      {/* Notifications */}
      <div className="bg-card rounded-2xl p-6 shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground">Notificações</h2>
            <p className="text-sm text-muted-foreground">Configure seus alertas</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Orçamento</p>
              <p className="text-sm text-muted-foreground">Receba alertas quando atingir 80% do orçamento</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Contas a Vencer</p>
              <p className="text-sm text-muted-foreground">Lembrete de contas próximas do vencimento</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Resumo Semanal</p>
              <p className="text-sm text-muted-foreground">Receba um resumo por e-mail toda semana</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-card rounded-2xl p-6 shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground">Segurança</h2>
            <p className="text-sm text-muted-foreground">Proteja sua conta</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Alterar Senha
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Autenticação de Dois Fatores
          </Button>
        </div>
      </div>

      {/* Logout */}
      <Button variant="outline" className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground">
        <LogOut className="w-4 h-4 mr-2" />
        Sair da Conta
      </Button>
    </div>
  );
};

export default Settings;
