import { getPublicBrainContents } from '@/app/actions/lib';
import { ContentCard } from '@/components/content-card';
import BrainContentButtons from '../../../../components/brain-content-button';
import { Brain } from 'lucide-react';
import { Redirect } from '@/components/redirect';
import PublicBrainEmpty from '@/components/empty-states/empty-brain-contents';

export default async function PublicContentPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;

  const brainContents = await getPublicBrainContents(hash);

  if (!brainContents || !brainContents.Brain) {
    return <Redirect to="/not-found" />;
  }
  const contents = brainContents.Brain.Contents;

  if (!contents || contents.length === 0) {
    return (
      <div className="py-24 px-4">
        <PublicBrainEmpty />
      </div>
    );
  }

  return (
    <div className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div></div>
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 halloween-font">
              <Brain className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold">{brainContents.Brain.name}</h1>
            </div>
            <p className="text-muted-foreground text-">
              {brainContents.Brain.description}
            </p>
          </div>
          <BrainContentButtons
            name={brainContents.Brain.user.name}
            stars={brainContents.Brain.stars.toString()}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents
            .slice()
            .reverse()
            .map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
        </div>
      </div>
    </div>
  );
}
