import Dashboard from '@/components/Dashboard';
import { Redirect } from '@/components/redirect';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="py-24 px-4">
      <Dashboard />
    </div>
  );
}
