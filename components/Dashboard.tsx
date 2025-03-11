import { getMyContents } from '@/app/actions/lib';
import { authOptions, session } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { ContentButtons } from './content-buttons';
import { ContentCard } from './content-card';
import EmptyDashboard from './empty-states/empty-dashboard';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const myContents = await getMyContents(
    parseInt((session as session).user.id)
  );

  if (!myContents || myContents.length === 0) {
    return <EmptyDashboard />;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold halloween-font text-primary mb-2">
            Your Memories
          </h1>
          <p className="text-muted-foreground">
            Save and organize content from across the web
          </p>
        </div>
        <ContentButtons />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myContents
          .slice()
          .reverse()
          .map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
      </div>
    </div>
  );
}
