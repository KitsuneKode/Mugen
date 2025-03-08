import EmbedsGrid from '@/components/embeds-grid';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/signin');
  }

  return (
    <div className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold halloween-font mb-2">
              Your Memories
            </h1>
            <p className="text-muted-foreground">
              Save and organize content from across the web
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Add New Content
            </Button>
            <Button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              Filter
            </Button>
          </div>
        </div>
        <EmbedsGrid />
      </div>
    </div>
  );
}
