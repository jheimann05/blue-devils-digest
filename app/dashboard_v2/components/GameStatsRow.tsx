// EXTENSION TRACK PLACEHOLDER FILE
// DO NOT IMPLEMENT HERE
// Scaffolding for Milestones M13–M18

type GameStatsRowProps = {
  top_performers: string;
};

const GameStatsRow = ({ top_performers }: GameStatsRowProps) => {
  return (
    <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-y border-gray-200">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Top Performers:
        </span>
        <span className="text-sm text-gray-800 leading-relaxed">
          {top_performers}
        </span>
      </div>
    </div>
  );
};

export default GameStatsRow;
