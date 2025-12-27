import { Row } from "../../../lib/data";

type GameHeaderProps = {
  date: string;
  opponent: string;
  duke_score: number;
  opp_score: number;
};

const GameHeader = ({ date, opponent, duke_score, opp_score }: GameHeaderProps) => {
  // TODO: Calculate if Duke won (duke_score > opp_score)
  const win = duke_score > opp_score;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      {/* Left side: Opponent and Date */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          {opponent}
        </h2>
        <span className="text-sm text-gray-500">
          {date}
        </span>
      </div>

      {/* Right side: Score and Win/Loss badge */}
      <div className="flex items-center gap-3">
        <div className="text-lg font-medium">
          Duke {duke_score} - {opp_score} {opponent}
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          win ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {win ? "W" : "L"}
        </span>
      </div>
    </div>
  );
};

export default GameHeader;