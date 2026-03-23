import { GoogleGenAI } from '@google/genai';
import { config } from './index.ts';

const ai = new GoogleGenAI({
  apiKey: config.GOOGLE_GEMINI_API_KEY,
});

export default ai;
