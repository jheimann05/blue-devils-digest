import { readSheetRows } from "../../lib/data";
import GameCard from "./components/GameCard";

export const revalidate = 30;

export default async function DashboardV2Page() {
  const rows = await readSheetRows(200);
  
  if (rows.length === 0) {
    return <div className="p-6">No games found</div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12">
        <div className="space-y-3 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Duke Blue Devils Digest — V2
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Game summaries and analytics
          </p>
        </div>
        
        {/* Responsive grid: 1 column on mobile, 2 on tablet/large, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {rows.map((game, i) => (
            <GameCard key={i} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
