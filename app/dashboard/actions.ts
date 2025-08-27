"use server";

import { revalidatePath } from "next/cache";
import { writeSheetRow, readSheetRows } from "../../lib/data";
import { generateCopy } from "../../lib/ai";

/** Save edited fields for a given sheet row */
export async function saveRow(formData: FormData) {
  const rowIndex = Number(formData.get("rowIndex"));
  const recap = String(formData.get("ai_recap") || "");
  const tweet = String(formData.get("ai_tweet") || "");
  const tags  = String(formData.get("ai_tags")  || "");

  if (!Number.isFinite(rowIndex) || rowIndex < 2) {
    throw new Error("Invalid rowIndex");
  }

  await writeSheetRow(rowIndex, {
    ai_recap: recap,
    ai_tweet: tweet,
    ai_tags: tags,
  });

  revalidatePath("/dashboard");
}

/** Mark processed = TRUE for a given row */
export async function markProcessed(formData: FormData) {
  const rowIndex = Number(formData.get("rowIndex"));
  if (!Number.isFinite(rowIndex) || rowIndex < 2) {
    throw new Error("Invalid rowIndex");
  }
  await writeSheetRow(rowIndex, { processed: true });
  revalidatePath("/dashboard");
}

/** Generate AI copy for one row and write it back */
export async function generateForRow(formData: FormData) {
  const rowIndex = Number(formData.get("rowIndex"));
  if (!Number.isFinite(rowIndex) || rowIndex < 2) {
    throw new Error("Invalid rowIndex");
  }

  // Pull the row data so we can send to the model
  const rows = await readSheetRows(1000);
  const idx = rowIndex - 2;
  const row = rows[idx];
  if (!row) throw new Error(`Row ${rowIndex} not found in cache`);

  const { json } = await generateCopy(row);

  await writeSheetRow(rowIndex, {
    ai_recap: json.recap,
    ai_tweet: json.tweet,
    ai_tags: json.tags.join(", "),
    processed: true,
  });

  revalidatePath("/dashboard");
}
