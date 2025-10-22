
import "dotenv/config";
import { readSheetRows } from "../lib/data";
import { generateCopy } from "../lib/ai";   // ← change this

async function main() {
  const [row] = await readSheetRows(1);
  const out = await generateCopy(row);
  console.log(JSON.stringify(out, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
