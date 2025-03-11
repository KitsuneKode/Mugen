import { getMyBrainContents } from '@/app/actions/lib';
import BrainContentButtons from '@/components/brain-content-button';
import { ContentCard } from '@/components/content-card';
import PublicBrainEmpty from '@/components/empty-states/empty-brain-contents';
import { Redirect } from '@/components/redirect';
import { authOptions } from '@/lib/auth';
import type { ContentType } from '@prisma/client';
import { Brain } from 'lucide-react';
import { getServerSession } from 'next-auth';

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
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to="/signin" />;
  }

  const { brainId } = await params;

  if (!brainId || isNaN(Number(brainId))) {
    return <Redirect to="/not-found" />;
  }

  const brainContents = await getMyBrainContents(Number(brainId));

  if (!brainContents) {
    return <Redirect to="/not-found" />;
  }

  if (brainContents.Contents.length === 0) {
    return (
      <div className="py-24 px-4">
        <PublicBrainEmpty publicMode={false} />
      </div>
    );
  }

  return (
    <div className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div></div>
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold">{brainContents.name}</h1>
            </div>
            <p className="text-muted-foreground">{brainContents.description}</p>
          </div>
          <BrainContentButtons
            name={brainContents.user.name}
            stars={brainContents.stars.toString()}
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
