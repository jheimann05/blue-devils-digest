import { readSheetRows } from "../../lib/data";
import { saveRow, markProcessed, generateForRow } from "./actions";

export const revalidate = 30; // refresh ISR cache every 30s

export default async function Dashboard() {
  const rows = await readSheetRows(200); // adjust if your sheet is longer
  
  return (
    <section className="p-6 space-y-5">
      <h1 className="text-2xl text-blue-800 font-semibold">BlueDevil Digest — Dashboard</h1>

      <ul className="space-y-4">
        {rows.map((r, i) => {
          const sheetRow = i + 2; // header is row 1
          const processed =
            String(r.processed ?? "").toLowerCase() === "true";

          return (
            <li key={sheetRow} className="rounded border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">
                    {r.date} — vs {r.opponent}
                  </div>
                  <div className="text-sm">
                    Duke {r.duke_score} : {r.opp_score}
                  </div>
                  <div className="text-xs text-gray-600">
                    {r.top_performers}
                  </div>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded border h-fit ${
                    processed
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }`}
                >
                  {processed ? "Processed" : "Unprocessed"}
                </span>
              </div>

              {/* Single form with multiple actions via formAction (no nested forms) */}
              <form className="mt-4 space-y-3" action={saveRow}>
                <input type="hidden" name="rowIndex" value={sheetRow} />

                <label className="block text-sm font-medium">
                  Recap
                  <textarea
                    name="ai_recap"
                    defaultValue={r.ai_recap}
                    rows={3}
                    className="mt-1 w-full rounded border p-2"
                    placeholder="~80 words…"
                  />
                </label>

                <label className="block text-sm font-medium">
                  Tweet (≤ 280 chars)
                  <input
                    name="ai_tweet"
                    defaultValue={r.ai_tweet}
                    className="mt-1 w-full rounded border p-2"
                    placeholder="One-line tweet…"
                  />
                </label>

                <label className="block text-sm font-medium">
                  Tags (comma-separated)
                  <input
                    name="ai_tags"
                    defaultValue={r.ai_tags}
                    className="mt-1 w-full rounded border p-2"
                    placeholder="#DukeMBB, #GoDuke, #ACC"
                  />
                </label>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {/* Default action = saveRow */}
                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 text-sm"
                  >
                    Save
                  </button>

                  {/* Different server actions via formAction on buttons */}
                  <button
                    formAction={generateForRow}
                    className="rounded bg-purple-600 px-3 py-1 text-white hover:bg-purple-700 text-sm"
                  >
                    Generate
                  </button>

                  {!processed && (
                    <button
                      formAction={markProcessed}
                      className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
                    >
                      Mark processed
                    </button>
                  )}
                </div>
              </form>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
