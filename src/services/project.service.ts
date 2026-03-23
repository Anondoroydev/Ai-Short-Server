import type { Request } from 'express';
import { unlink } from 'node:fs/promises';
import { prisma } from '../lib/prisma.ts';
import { generateImageWithAI } from './ai.service.ts';
import { uploadImages } from './cloudinary.service.ts';

export async function createProjectService(req: Request) {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { credits: true },
  });

  if (!user || user.credits < 5) {
    throw new Error('Insufficient credits. You need at least 5 credits.');
  }

  const files = req.files as {
    [fieldName: string]: Express.Multer.File[];
  };

  const productImage = files?.productImage?.[0];
  const modelImage = files?.modelImage?.[0];

  if (!productImage || !modelImage) {
    throw new Error('Images required');
  }

  // 2. Deduct credits upfront
  await prisma.user.update({
    where: { id: req.user!.id },
    data: { credits: { decrement: 5 } },
  });

  let project;

  try {
    // upload images
    const [productUpload, modelUpload] = await uploadImages([
      productImage.path,
      modelImage.path,
    ]);

    // create project record
    project = await prisma.project.create({
      data: {
        ...req.body,
        productImage: productUpload?.secure_url as string,
        modelImage: modelUpload?.secure_url as string,
        generatedImage: '',
        generatedVideo: '',
        userId: req.user!.id,
      },
    });

    // 3. Generate AI image
    const generatedImage = await generateImageWithAI(
      productImage,
      modelImage,
      req.body,
    );

    unlink(productImage.path);
    unlink(modelImage.path);

    // update project with result
    return await prisma.project.update({
      where: { id: project.id },
      data: { generatedImage },
    });
  } catch (error) {
    // 4. If anything fails, refund the credits
    await prisma.user.update({
      where: { id: req.user!.id },
      data: { credits: { increment: 5 } },
    });

    // Log the error for your own debugging
    console.error('Generation failed, credits refunded:', error);
    unlink(productImage.path);
    unlink(modelImage.path);
    throw new Error(
      'Image generation failed. Your credits have been refunded.',
    );
  }
}
