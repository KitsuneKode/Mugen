import { ContentButtons } from '@/components/content-buttons';
import ExploreGrid from '@/components/explore-grid';
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
          <ContentButtons />
        </div>

        <ExploreGrid />
      </div>
    </div>
  );
}
