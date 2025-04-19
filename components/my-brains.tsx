import { getMyBrains } from '@/app/actions/lib';
import { authOptions, session } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import BrainCard from './brain-card';
import { ContentButtons } from './content-buttons';
import EmptyBrain from './empty-states/empty-brain';

export const revalidate = 60;

export default async function MyBrains() {
  const session = await getServerSession(authOptions);

  const myBrains = await getMyBrains(parseInt((session as session).user.id));

  if (!myBrains || myBrains.length === 0) {
    return <EmptyBrain />;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold halloween-font mb-2 text-primary">
            Your Second Brain
          </h1>
          <p className="text-muted-foreground">
            Organize, connect, and interact with your digital content
          </p>
        </div>
        <ContentButtons />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBrains
          .slice()
          .reverse()
          .map((brain) => (
            <BrainCard key={brain.id} brain={brain} publicMode />
          ))}
      </div>
    </div>
  );
}
