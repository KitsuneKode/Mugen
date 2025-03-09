import { getPublicBrains } from '@/app/actions/lib';
import PublicBrainCard from './public-brain-card';

export default async function ExploreGrid() {
  const publicBrains = await getPublicBrains();

  if (!publicBrains) {
    return (
      <div className="flex-1 h-full w-full text-5xl text-center justify-center items-center flex">
        Empty
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {publicBrains.map((brain) => (
        <PublicBrainCard key={brain.id} brain={brain} />
      ))}
    </div>
  );
}
