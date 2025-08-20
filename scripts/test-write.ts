(async () => {
    const dotenv = (await import("dotenv")).default;
    dotenv.config(); // loads .env
  
    // Import AFTER dotenv so Config reads populated env vars
    const { writeSheetRow } = await import("../lib/data");
  
    console.log("[env check]",
      "SHEET_ID?", !!process.env.SHEET_ID,
      "GOOGLE_CREDS?", !!process.env.GOOGLE_CREDS
    );
  
    // Update SHEET ROW 3 (header=1, first data row=2)
    await writeSheetRow(3, {
      processed: true,
      ai_recap: "✅ test recap worked",
    });
  
    console.log("Row 3 updated");
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });