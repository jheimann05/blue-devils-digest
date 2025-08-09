import path from 'path'; import fs from 'fs';

export type Row={date:string,opponent:string,duke_score:number,opp_score:number,top_performers:string,angle:string,processed:string|boolean,ai_recap:string,ai_tweet:string,ai_tags:string};

// Temporary local data for Milestones 1–2 ---------------------------------
export async function readLocalRows():Promise<Row[]>{
  const p=path.join(process.cwd(),'data','sample.json');
  return JSON.parse(fs.readFileSync(p,'utf-8'));
}
// -------------------------------------------------------------------------

// TODO Milestone 3:
// export async function readSheetRows():Promise<Row[]>{ /* Sheets API read */ }

// TODO Milestone 4:
// export async function writeSheetRow(rowIndex:number, values:Partial<Row>):Promise<void>{ /* Sheets API write */ }
