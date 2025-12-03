import { ReactNode, useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { TransactionModal } from '@/components/transactions/TransactionModal';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onNewTransaction={() => setTransactionModalOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
      <TransactionModal 
        open={transactionModalOpen} 
        onOpenChange={setTransactionModalOpen} 
      />
    </div>
  );
};
