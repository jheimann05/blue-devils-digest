import { readSheetRows } from "../../lib/data";
import GameHeader from "./components/GameHeader";

export const revalidate = 30;

export default async function DashboardV2Page() {
  const rows = await readSheetRows(200);
  
  // For testing - just show the first game's header
  const firstGame = rows[0];
  
  if (!firstGame) {
    return <div>No games found</div>;
  }
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">
        Duke Blue Devils Digest — V2
      </h1>
      
      {/* Test GameHeader with real data */}
      <GameHeader
        date={firstGame.date}
        opponent={firstGame.opponent}
        duke_score={firstGame.duke_score}
        opp_score={firstGame.opp_score}
      />
      
      {/* You can also test with multiple games later */}
      <div className="space-y-4">
        {rows.slice(0, 3).map((game, i) => (
          <GameHeader
            key={i}
            date={game.date}
            opponent={game.opponent}
            duke_score={game.duke_score}
            opp_score={game.opp_score}
          />
        ))}
      </div>
    </div>
  );
}
