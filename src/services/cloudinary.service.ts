import { v2 as cloudinary } from 'cloudinary';

export async function uploadImages(paths: string[]) {
  const uploads = paths.map((path) =>
    cloudinary.uploader.upload(path, {
      folder: 'ai-shorts',
      resource_type: 'image',
      use_filename: true,
    }),
  );

  return Promise.all(uploads);
}
