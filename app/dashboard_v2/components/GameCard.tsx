import { Row } from "../../../lib/data";
import GameHeader from "./GameHeader";
import GameStatsRow from "./GameStatsRow";
import GameBody from "./GameBody";

type GameCardProps = {
  game: Row;
};

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200 overflow-hidden group">
      <GameHeader
        date={game.date}
        opponent={game.opponent}
        duke_score={game.duke_score}
        opp_score={game.opp_score}
      />
      
      <GameStatsRow top_performers={game.top_performers} />
      
      <GameBody
        ai_recap={game.ai_recap}
        ai_tags={game.ai_tags}
      />
    </div>
  );
};

export default GameCard;
