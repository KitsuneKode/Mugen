import ExploreGrid from '@/components/explore-grid';
import { Button } from '@/components/ui/button';
export default function Dashboard() {
  return (
    <div className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold halloween-font mb-2">
              Your Second Brain
            </h1>
            <p className="text-muted-foreground">
              Organize, connect, and interact with your digital content
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Add Content
            </Button>
            <Button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              Share Brain
            </Button>
          </div>
        </div>

        <ExploreGrid />
      </div>
    </div>
  );
}
