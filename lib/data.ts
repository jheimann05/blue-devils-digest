import path from 'path'; import fs from 'fs';
import { google } from 'googleapis';
import { Config } from './config';

export type Row={date:string,opponent:string,duke_score:number,opp_score:number,top_performers:string,angle:string,processed:string|boolean,ai_recap:string,ai_tweet:string,ai_tags:string};

// Temporary local data for Milestones 1–2 ---------------------------------
export async function readLocalRows():Promise<Row[]>{
  const p=path.join(process.cwd(),'data','sample.json');
  return JSON.parse(fs.readFileSync(p,'utf-8'));
}
// -------------------------------------------------------------------------

// TODO Milestone 3:
export async function readSheetRows():Promise<Row[]>{   if (!Config.SHEET_ID) {
  throw new Error('SHEET_ID is missing. Add it to .env');
}
if (!Config.GOOGLE_CREDENTIALS) {
  throw new Error('GOOGLE_CREDS is missing. Add it to .env');
}

// Parse service account JSON from env
const creds = JSON.parse(Config.GOOGLE_CREDENTIALS);
// Fix private_key newlines if they arrive escaped
if (creds.private_key && typeof creds.private_key === 'string') {
  creds.private_key = creds.private_key.replace(/\\n/g, '\n');
}

// Auth: read-only scope for Sheets
const auth = new google.auth.JWT(
  creds.client_email,
  undefined,
  creds.private_key,
  ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

const sheets = google.sheets({ version: 'v4', auth });

// Change "Sheet1" if your tab has a different name
const range = 'Sheet1!A1:J1000';
const res = await sheets.spreadsheets.values.get({
  spreadsheetId: Config.SHEET_ID,
  range,
});

const values = res.data.values || [];
if (values.length === 0) return [];

// Expect header row: date, opponent, duke_score, opp_score, top_performers, angle, processed, ai_recap, ai_tweet, ai_tags
const header = values[0].map((h) => h?.toString().trim().toLowerCase());
const expected = [
  'date','opponent','duke_score','opp_score',
  'top_performers','angle','processed','ai_recap','ai_tweet','ai_tags'
];
const headerOK =
  header.length >= expected.length &&
  expected.every((h, i) => header[i] === h);

if (!headerOK) {
  console.warn('Unexpected header row in Sheet:', header);
}

// Map rows to your Row type
const rows = values.slice(1);
const toNum = (s: any) => {
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};

const mapped: Row[] = rows
  .filter((r) => r && r.length > 0 && r[0] !== '') // skip blank
  .map((cols) => {
    const get = (i: number) => (cols[i] ?? '').toString().trim();

    // processed can be TRUE/FALSE or blank
    const rawProcessed = get(6).toLowerCase();
    const processed =
      rawProcessed === 'true'
        ? true
        : rawProcessed === 'false'
        ? false
        : get(6);

    return {
      date: get(0),
      opponent: get(1),
      duke_score: toNum(get(2)),
      opp_score: toNum(get(3)),
      top_performers: get(4),
      angle: get(5),
      processed,
      ai_recap: get(7),
      ai_tweet: get(8),
      ai_tags: get(9),
    };
  });

return mapped;
}

// TODO Milestone 4:
// export async function writeSheetRow(rowIndex:number, values:Partial<Row>):Promise<void>{ /* Sheets API write */ }
