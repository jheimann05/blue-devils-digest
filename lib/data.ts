import path from 'path'; import fs from 'fs';
import { google } from 'googleapis';
import { Config } from './config';
console.log('[M3 debug]',
  'has SHEET_ID:', !!Config.SHEET_ID,
  'has GOOGLE_CREDS:', !!Config.GOOGLE_CREDENTIALS
);
export type Row={date:string,opponent:string,duke_score:number,opp_score:number,top_performers:string,angle:string,processed:string|boolean,ai_recap:string,ai_tweet:string,ai_tags:string};

// Temporary local data for Milestones 1–2 ---------------------------------
export async function readLocalRows():Promise<Row[]>{
  const p=path.join(process.cwd(),'data','sample.json');
  return JSON.parse(fs.readFileSync(p,'utf-8'));
}
// -------------------------------------------------------------------------

// TODO Milestone 3:
export async function readSheetRows(): Promise<Row[]> {
  if (!Config.SHEET_ID) throw new Error('SHEET_ID is missing. Add it to .env.local');
  if (!Config.GOOGLE_CREDENTIALS) throw new Error('GOOGLE_CREDS is missing. Add it to .env.local');

  const creds = JSON.parse(Config.GOOGLE_CREDENTIALS);
  if (typeof creds.private_key === 'string') {
    // turn the \n escapes in .env into real newlines
    creds.private_key = creds.private_key.replace(/\\n/g, '\n');
  }

  // ✅ Use GoogleAuth + getClient so requests are always authenticated
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  // Change tab name if yours isn't "Sheet1"
  const range = 'Sheet1!A1:J1000';
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: Config.SHEET_ID,
    range,
  });

  const values = res.data.values || [];
  if (values.length === 0) return [];

  const rows = values.slice(1).filter(r => r && r.length);
  const toNum = (s: any) => (Number.isFinite(Number(s)) ? Number(s) : 0);

  return rows.map((cols) => {
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

// TODO Milestone 4:
// export async function writeSheetRow(rowIndex:number, values:Partial<Row>):Promise<void>{ /* Sheets API write */ }
