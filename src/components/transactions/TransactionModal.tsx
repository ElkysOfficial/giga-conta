import { useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { categories, personalWallets, businessProjects, businessSuppliers } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TransactionModal = ({ open, onOpenChange }: TransactionModalProps) => {
  const { currentProfile } = useProfile();
  const { toast } = useToast();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const categoryList = currentProfile === 'personal' ? categories.personal : categories.business;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transação salva!",
      description: "Sua transação foi registrada com sucesso.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            {currentProfile === 'personal' ? 'Nova Transação' : 'Novo Lançamento'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Type Selector */}
          <Tabs value={type} onValueChange={(v) => setType(v as 'income' | 'expense')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expense" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
                Despesa
              </TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:bg-success data-[state=active]:text-success-foreground">
                Receita
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
              <Input
                id="amount"
                type="text"
                placeholder="0,00"
                className="pl-10 text-lg font-semibold"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" placeholder="Ex: Supermercado, Salário..." />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categoryList.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Personal Mode: Wallet */}
          {currentProfile === 'personal' && (
            <div className="space-y-2">
              <Label>Carteira</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a carteira" />
                </SelectTrigger>
                <SelectContent>
                  {personalWallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      {wallet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Business Mode: Extra Fields */}
          {currentProfile === 'business' && (
            <>
              {/* Supplier */}
              <div className="space-y-2">
                <Label>Fornecedor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessSuppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Project */}
              <div className="space-y-2">
                <Label>Projeto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Vincular a um projeto (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cost Center */}
              <div className="space-y-2">
                <Label>Centro de Custo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o centro de custo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operacoes">Operações</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                    <SelectItem value="rh">RH</SelectItem>
                    <SelectItem value="ti">TI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label>Data de Vencimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea id="notes" placeholder="Notas adicionais..." rows={2} />
          </div>

          {/* Attachment */}
          <div className="space-y-2">
            <Label>Comprovante</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Arraste um arquivo ou clique para enviar</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
