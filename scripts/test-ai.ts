// scripts/test-ai.ts
import "dotenv/config";
import { readSheetRows } from "../lib/data";
import { mockGenerate } from "../lib/ai";

async function main() {
  const rows = await readSheetRows();
  if (rows.length === 0) throw new Error("No rows in sheet!");

  const row = rows[0];
  console.log("Using row:", row);

  const result = await mockGenerate(row);

  console.log("AI Result (raw):", result);
  console.log("AI Result (JSON):", JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
