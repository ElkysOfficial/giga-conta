import { useProfile } from '@/contexts/ProfileContext';
import { PersonalDashboard } from '@/components/dashboard/PersonalDashboard';
import { BusinessDashboard } from '@/components/dashboard/BusinessDashboard';

const Dashboard = () => {
  const { currentProfile } = useProfile();

  return currentProfile === 'personal' ? <PersonalDashboard /> : <BusinessDashboard />;
};

export default Dashboard;
