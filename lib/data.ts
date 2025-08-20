import path from 'path';
import fs from 'fs';
import { google } from 'googleapis';
import { Config } from './config';

export type Row = {
  date: string;
  opponent: string;
  duke_score: number;
  opp_score: number;
  top_performers: string;
  angle: string;
  processed: string | boolean;
  ai_recap: string;
  ai_tweet: string;
  ai_tags: string;
};

// ---------- Local (M1–M2) ----------
export async function readLocalRows(): Promise<Row[]> {
  const p = path.join(process.cwd(), 'data', 'sample.json');
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

// ---------- Shared Sheets client (read + write) ----------
function getSheetsClient() {
  if (!Config.SHEET_ID) {
    throw new Error('SHEET_ID is missing. Add it to .env');
  }
  if (!Config.GOOGLE_CREDENTIALS) {
    throw new Error('GOOGLE_CREDS is missing. Add it to .env');
  }

  const creds = JSON.parse(Config.GOOGLE_CREDENTIALS);
  if (typeof creds?.private_key === 'string') {
    // Fix escaped newlines from .env
    creds.private_key = creds.private_key.replace(/\\n/g, '\n');
  }

  // Use WRITE scope so reads and writes both work
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Default tab helper
function tabName() {
  // If you later add SHEET_TAB to Config, it will be used.
  // @ts-ignore
  return (Config as any).SHEET_TAB || 'Sheet1';
}

// ---------- Milestone 3: READ from Google Sheets ----------
export async function readSheetRows(limit = 100): Promise<Row[]> {
  const sheets = getSheetsClient();

  const range = `${tabName()}!A1:J1000`;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: Config.SHEET_ID,
    range,
  });

  const values = res.data.values || [];
  if (values.length === 0) return [];

  const rows = values.slice(1).filter(r => r && r.length);
  const toNum = (s: any) => (Number.isFinite(Number(s)) ? Number(s) : 0);

  return rows.slice(0, limit).map((cols) => {
    const get = (i: number) => (cols[i] ?? '').toString().trim();
    const p = get(6).toLowerCase();

    return {
      date: get(0),
      opponent: get(1),
      duke_score: toNum(get(2)),
      opp_score: toNum(get(3)),
      top_performers: get(4),
      angle: get(5),
      processed: p === 'true' ? true : p === 'false' ? false : get(6),
      ai_recap: get(7),
      ai_tweet: get(8),
      ai_tags: get(9),
    };
  });
}

// ---------- Milestone 4: generic WRITE helper ----------
const colByKey = {
  date: 'A',
  opponent: 'B',
  duke_score: 'C',
  opp_score: 'D',
  top_performers: 'E',
  angle: 'F',
  processed: 'G',
  ai_recap: 'H',
  ai_tweet: 'I',
  ai_tags: 'J',
} as const;

export async function writeSheetRow(rowIndex: number, values: Partial<Row>): Promise<void> {
  if (!Number.isFinite(rowIndex) || rowIndex < 2) {
    throw new Error('rowIndex must be a 1-based sheet row >= 2');
  }

  const sheets = getSheetsClient();
  const tab = tabName();

  // Build a batch of ValueRange updates (one per provided key)
  const data: Array<{ range: string; values: any[][] }> = [];

  for (const [key, val] of Object.entries(values)) {
    const col = (colByKey as any)[key];
    if (!col) continue; // ignore unknown keys

    // Coerce booleans to TRUE/FALSE for Sheets display
    let out: any = val;
    if (typeof val === 'boolean') out = val ? 'TRUE' : 'FALSE';

    data.push({
      range: `${tab}!${col}${rowIndex}`,
      values: [[out]],
    });
  }

  if (data.length === 0) return;

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: Config.SHEET_ID,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data,
    },
  });
}
