import { KPICard } from './KPICard';
import { MainChart } from './MainChart';
import { RecentTransactions } from './RecentTransactions';
import { AlertsCard } from './AlertsCard';
import { 
  businessKPIs, 
  businessChartData, 
  costCenterData,
  businessTransactions 
} from '@/data/mockData';

export const BusinessDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {businessKPIs.map((kpi, index) => (
          <KPICard key={kpi.label} data={kpi} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts - Take 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <MainChart 
            data={businessChartData} 
            title="Fluxo de Caixa (6 meses)" 
          />
          <MainChart 
            data={costCenterData} 
            title="Despesas por Centro de Custo" 
            type="bar"
          />
        </div>

        {/* Alerts and Transactions */}
        <div className="lg:col-span-1 space-y-6">
          <AlertsCard transactions={businessTransactions} />
          <RecentTransactions transactions={businessTransactions} showWallet={false} />
        </div>
      </div>
    </div>
  );
};
