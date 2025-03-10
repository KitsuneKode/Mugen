import { getMyBrains } from '@/app/actions/lib';
import { authOptions, session } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import BrainCard from './brain-card';

export default async function MyBrains() {
  const session = await getServerSession(authOptions);

  const myBrains = await getMyBrains(parseInt((session as session).user.id));

  if (!myBrains) {
    return (
      <div className="flex-1 text-primary h-full w-full text-5xl text-center justify-center items-center flex">
        Empty: No Brains Found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myBrains.map((brain) => (
        <BrainCard key={brain.id} brain={brain} publicMode />
      ))}
    </div>
  );
}
