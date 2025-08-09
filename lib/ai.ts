/* Milestone 5 stub.
   Replace mockGenerate() with a real OpenAI call using the ChatCompletion API. */
import type { Row } from './data';

export async function mockGenerate(row: Row){
  return {
    recap: `Mock recap for ${row.opponent}`,
    tweet: `Duke beats ${row.opponent}!`,
    tags: ['#Duke', '#BlueDevils', '#Mock']
  };
}

// TODO after Milestone 5:
// import OpenAI from 'openai';
// export async function generateCopy(row: Row){ ... }
