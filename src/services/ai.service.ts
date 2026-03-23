import {
  HarmBlockThreshold,
  HarmCategory,
  type GenerateContentConfig,
} from '@google/genai';
import { v2 as cloudinary } from 'cloudinary';
import ai from '../config/ai.ts';
import convertImageToBase64 from '../utils/convertImageToBase64.ts';
type GenerateImageInput = {
  userPrompt?: string;
  aspectRatio?: string;
};
export async function generateImageWithAI(
  productImage: Express.Multer.File,
  modelImage: Express.Multer.File,
  body: GenerateImageInput,
) {
  try {
    const generationConfig: GenerateContentConfig = {
      maxOutputTokens: 32768,
      temperature: 1,
      topP: 0.95,
      responseModalities: ['IMAGE'],
      imageConfig: {
        aspectRatio: body.aspectRatio || '9:16',
        imageSize: '1k',
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    };

    const product = convertImageToBase64(
      productImage.path,
      productImage.mimetype,
    );
    const model = convertImageToBase64(modelImage.path, modelImage.mimetype);

    const prompt = [
      {
        text: `Combine the person and product into realistic e-commerce imagery.Make the person naturally hold or use the product. Match lighting, shadows, scale and perspective. Make the person stand in professional studio lighting. Output e-commerce quality image realistic imagery ${body.userPrompt}`,
      },
      product,
      model,
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: prompt,
      config: generationConfig,
    });

    const parts = response?.candidates?.[0]?.content?.parts;

    let buffer: Buffer | null = null;
    if (!parts) {
      throw new Error('unexpected response');
    }
    for (const part of parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data as string;
        buffer = Buffer.from(imageData, 'base64');
      }
    }

    if (!buffer) throw new Error('Image generation failed');

    const base64 = `data:image/png;base64,${buffer.toString('base64')}`;

    const upload = await cloudinary.uploader.upload(base64, {
      folder: 'ai-shorts',
    });

    return upload.secure_url;
  } catch (error) {
    console.error('AI Generation Error:', JSON.stringify(error, null, 2));
    throw new Error(
      'Failed to generate image due to safety or API constraints.',
    );
  }
}
