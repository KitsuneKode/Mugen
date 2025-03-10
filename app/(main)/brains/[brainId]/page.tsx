import { getMyBrainContents } from '@/app/actions/lib';
import BrainContentButtons from '@/components/brain-content-button';
import { ContentCard } from '@/components/content-card';
import { Redirect } from '@/components/redirect';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function ContentPage({
  params,
}: {
  params: { brainId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to="/signin" />;
  }

  const { brainId } = await params;
  const brainContents = await getMyBrainContents(Number(brainId));

  if (!brainContents) {
    return (
      <div className="flex-1 h-full w-full text-5xl text-center justify-center items-center flex">
        Empty
      </div>
    );
  }

  return (
    <div className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold halloween-font mb-2">
              {brainContents.name}
            </h1>
            <p className="text-muted-foreground">{brainContents.description}</p>
          </div>
          <BrainContentButtons
            name={brainContents.user.name}
            stars={brainContents.stars.toString()}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brainContents.Contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
}
