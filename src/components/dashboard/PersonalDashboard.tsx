import { KPICard } from './KPICard';
import { MainChart } from './MainChart';
import { CategoryProgress } from './CategoryProgress';
import { RecentTransactions } from './RecentTransactions';
import { 
  personalKPIs, 
  personalChartData, 
  personalCategorySpending, 
  personalTransactions 
} from '@/data/mockData';

export const PersonalDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {personalKPIs.map((kpi, index) => (
          <KPICard key={kpi.label} data={kpi} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <MainChart 
            data={personalChartData} 
            title="Entradas vs Saídas (6 meses)" 
          />
        </div>

        {/* Category Progress */}
        <div className="lg:col-span-1">
          <CategoryProgress data={personalCategorySpending} />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={personalTransactions} showWallet />
    </div>
  );
};
