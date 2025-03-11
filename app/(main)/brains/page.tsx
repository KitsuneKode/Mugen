import MyBrains from '@/components/my-brains';
import { Redirect } from '@/components/redirect';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function BrainPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="py-24 px-4">
      <MyBrains />
    </div>
  );
}
