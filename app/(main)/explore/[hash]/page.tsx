import { getPublicBrainContents } from '@/app/actions/lib';
import BrainContentButtons from '@/components/brain-content-button';
import { ContentCard } from '@/components/content-card';
import PublicBrainEmpty from '@/components/empty-states/empty-brain-contents';
import { Redirect } from '@/components/redirect';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedBrain from '@/components/animated-brain';

export const revalidate = 60;

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
      <div className="py-24 px-4 max-h-screen overflow-y-auto">
        <PublicBrainEmpty />
      </div>
    );
  }

  return (
    <div className="py-24 px-4 max-h-screen overflow-y-auto">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 halloween-font">
            <AnimatedBrain />
            <h1 className="text-4xl font-bold">{brainContents.Brain.name}</h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            {brainContents.Brain.description}
          </p>
        </div>

        <div className="flex justify-end mb-8">
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

        <div className="mt-12 text-center border-t border-border pt-8">
          <h2 className="text-xl font-medium mb-4">
            Want to create your own Second Brain?
          </h2>
          <Link href="/brains">
            <Button className="glow mx-auto">Get Started For Free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
