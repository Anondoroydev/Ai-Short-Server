import { readFileSync } from 'node:fs';

function convertImageToBase64(path: string, mimeType: string) {
  return {
    inlineData: {
      mimeType,
      data: readFileSync(path).toString('base64'),
    },
  };
}

export default convertImageToBase64;
