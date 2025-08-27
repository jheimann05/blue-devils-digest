// scripts/process-unprocessed.ts
(async () => {
    const dotenv = (await import("dotenv")).default;
    dotenv.config(); // loads .env
  
    const { readSheetRows, writeSheetRow } = await import("../lib/data");
    const { generateCopy } = await import("../lib/ai");
  
    // Config
    const MAX_ROWS = Infinity;      // change to limit (e.g. 5) during testing
    const DELAY_MS = 800;           // ~1–2 rows/sec (adjust 500–1000ms)
    const START_AT_ROW = 2;         // header = 1, first data row = 2
    const DRY_RUN = false;          // set true to preview without writing
  
    // Helpers
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    const isTrue = (v: unknown) => String(v).toLowerCase() === "true";
  
    // 1) Read rows (M3)
    const rows = await readSheetRows(1000);
    if (!rows.length) {
      console.log("No rows found.");
      return;
    }
  
    // 2) Filter unprocessed rows
    type IndexedRow = { row: any; sheetRow: number };
    const candidates: IndexedRow[] = [];
    for (let i = 0; i < rows.length; i++) {
      const sheetRow = i + 2; // 1-based row in the sheet
      if (sheetRow < START_AT_ROW) continue;
  
      const r = rows[i];
      const processed = isTrue(r.processed);
      if (!processed) {
        candidates.push({ row: r, sheetRow });
      }
      if (candidates.length >= MAX_ROWS) break;
    }
  
    if (!candidates.length) {
      console.log("No unprocessed rows 🎉");
      return;
    }
  
    console.log(`Will process ${candidates.length} row(s)...`);
  
    let success = 0, skipped = 0, failed = 0;
  
    for (const { row, sheetRow } of candidates) {
      try {
        console.log(`\n– Row ${sheetRow}: ${row.date} vs ${row.opponent}`);
  
        // 3) Generate AI copy (M5)
        const { json } = await generateCopy({
          date: row.date,
          opponent: row.opponent,
          duke_score: row.duke_score,
          opp_score: row.opp_score,
          top_performers: row.top_performers,
          angle: row.angle,
          processed: row.processed,
          ai_recap: row.ai_recap,
          ai_tweet: row.ai_tweet,
          ai_tags: row.ai_tags,
        } as any); // cast so we can pass the Row-ish object directly
  
        console.log("   recap:", json.recap.slice(0, 80) + (json.recap.length > 80 ? "…" : ""));
        console.log("   tweet:", json.tweet);
        console.log("    tags:", json.tags.join(", "));
  
        if (DRY_RUN) {
          console.log("   DRY RUN: not writing");
          skipped++;
        } else {
          // 4) Write back (M4)
          await writeSheetRow(sheetRow, {
            ai_recap: json.recap,
            ai_tweet: json.tweet,
            ai_tags: json.tags.join(", "),
            processed: true,
          });
          console.log("   ✅ wrote H–J and set processed=TRUE");
          success++;
        }
  
        // 5) Throttle
        await sleep(DELAY_MS);
      } catch (e: any) {
        console.error("   ❌ failed:", e?.message || e);
        failed++;
        // Optional backoff on failure
        await sleep(1200);
      }
    }
  
    console.log(`\nDone. success=${success}, skipped=${skipped}, failed=${failed}`);
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
  