import PublicBrains from '@/components/public-brains';
import { Button } from '@/components/ui/button';

export const revalidate = 60;

export default async function ExplorePage() {
  return (
    <div className="py-24 px-4 max-h-screen overflow-y-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold halloween-font text-primary mb-2">
              Explore Public Brains
            </h1>
            <p className="text-muted-foreground">
              Discover and learn from other people&apos;s Second Brains
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search public brains..."
                className="w-64 px-4 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50 pr-10"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent m-0 p-0 hover:bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </Button>
            </div>
            <Button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              Filter
            </Button>
          </div>
        </div>

        <PublicBrains />
      </div>
    </div>
  );
}
