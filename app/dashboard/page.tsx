import { readSheetRows } from '../../lib/data';

export default async function Dashboard() {
  const rows = await readSheetRows();
  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">Dashboard (Live data)</h1>
      <ul className="space-y-2">
        {rows.map((r, i) => (
          <li key={i} className="border p-3 rounded">
            <div className="font-medium">{r.opponent} — {r.date}</div>
            <div className="text-sm">Duke {r.duke_score} : {r.opp_score}</div>
            <div className="text-xs text-gray-600">{r.top_performers}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}