import { getPublicBrainContents } from '@/app/actions/lib';
import { ContentCard } from '@/components/content-card';
import BrainContentButtons from '../../../../components/brain-content-button';

export default async function PublicContentPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;

  const brainContents = await getPublicBrainContents(hash);

  if (!brainContents) {
    return (
      <div className="flex-1 h-full w-full text-5xl text-center justify-center items-center flex">
        Empty
      </div>
    );
  }
  const contents = brainContents.Brain.Contents;

  return (
    <div className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold halloween-font mb-2">
              {brainContents.Brain.name}
            </h1>
            <p className="text-muted-foreground">
              {brainContents.Brain.description}
            </p>
          </div>
          <BrainContentButtons
            name={brainContents.Brain.user.name}
            stars={brainContents.Brain.stars.toString()}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
}
