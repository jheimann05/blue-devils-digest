import { Row } from "../../../lib/data";

type GameHeaderProps = {
  date: string;
  opponent: string;
  duke_score: number;
  opp_score: number;
};

const GameHeader = ({ date, opponent, duke_score, opp_score }: GameHeaderProps) => {
  const win = duke_score > opp_score;

  return (
    <div className="flex flex-col gap-3 px-5 py-5 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200">
      {/* Opponent */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">
        vs {opponent}
      </h2>
      
      {/* Date */}
      <span className="text-xs md:text-sm text-gray-500 font-medium">
        {date}
      </span>
      
      {/* Result: Score and Win/Loss badge */}
      <div className="flex items-center gap-3">
        <div className="text-base md:text-lg font-semibold text-gray-800">
          Duke {duke_score} - {opp_score}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          win 
            ? "bg-green-500 text-white shadow-sm" 
            : "bg-red-500 text-white shadow-sm"
        }`}>
          {win ? "W" : "L"}
        </span>
      </div>
    </div>
  );
};

export default GameHeader;