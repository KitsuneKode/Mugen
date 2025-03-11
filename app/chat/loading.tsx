import { Skeleton } from '@/components/ui/skeleton';

export default function ChatLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="border-b border-border p-4 bg-card/50">
        <div className="container mx-auto">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-8 w-64" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%] rounded-lg p-4 bg-card border border-border">
                <Skeleton className="h-5 w-5 rounded-full mt-1 flex-shrink-0" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>
            </div>

            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`flex ${
                    i % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`
                    flex gap-3 max-w-[80%] rounded-lg p-4
                    ${
                      i % 2 === 0
                        ? 'bg-primary'
                        : 'bg-card border border-border'
                    }
                  `}
                  >
                    {i % 2 !== 0 && (
                      <Skeleton className="h-5 w-5 rounded-full mt-1 flex-shrink-0" />
                    )}
                    <div className="space-y-2 w-full">
                      <Skeleton
                        className={`h-4 w-full ${
                          i % 2 === 0 ? 'bg-primary-foreground/30' : ''
                        }`}
                      />
                      <Skeleton
                        className={`h-4 w-5/6 ${
                          i % 2 === 0 ? 'bg-primary-foreground/30' : ''
                        }`}
                      />
                      <Skeleton
                        className={`h-4 w-4/6 ${
                          i % 2 === 0 ? 'bg-primary-foreground/30' : ''
                        }`}
                      />
                    </div>
                    {i % 2 === 0 && (
                      <Skeleton className="h-5 w-5 rounded-full mt-1 flex-shrink-0 bg-primary-foreground/30" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-12 rounded-lg" />
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
          <div className="mt-2 flex justify-center">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
