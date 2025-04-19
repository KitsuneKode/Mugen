import { getMyBrainContents } from '@/app/actions/lib';
import AnimatedBrain from '@/components/animated-brain';
import BrainContentButtons from '@/components/brain-content-button';
import { ContentCard } from '@/components/content-card';
import PublicBrainEmpty from '@/components/empty-states/empty-brain-contents';
import type { ContentType } from '@prisma/client';
import { redirect } from 'next/navigation';

export const revalidate = 60;

interface BrainContents {
  id: number;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    avatarId: number;
  };
  Tags: {
    tag: string;
  }[];
  type: ContentType;
  title: string;
  link: string;
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ brainId: string }>;
}) {
  const { brainId } = await params;

  if (!brainId || isNaN(Number(brainId))) {
    return redirect('/not-found');
  }

  const brainContents = await getMyBrainContents(Number(brainId));

  if (!brainContents) {
    return redirect('/not-found');
  }

  if (brainContents.Contents.length === 0) {
    return (
      <div className="py-24 px-4">
        <PublicBrainEmpty publicMode={false} />
      </div>
    );
  }

  return (
    <div className="py-24 px-4 max-h-screen overflow-y-auto">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 halloween-font">
            <AnimatedBrain />
            <h1 className="text-4xl font-bold">{brainContents.name}</h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            {brainContents.description}
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <BrainContentButtons
            name={brainContents.user.name}
            stars={brainContents.stars.toString()}
            publicMode={false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brainContents.Contents.slice()
            .reverse()
            .map((content: BrainContents) => (
              <ContentCard key={content.id} content={content} />
            ))}
        </div>
      </div>
    </div>
  );
}
