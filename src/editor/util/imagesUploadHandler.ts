import { getFileUploadUrl, uploadEditorFile } from '@/api/Community';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

export const imagesUploadHandler =
  (userId: string, appendAttachmentIds: (uploadKey: string) => void, postIndex?: number) =>
  async (blobInfo: any) => {
    const blob = blobInfo.blob() as File;
    const originalImage = new File([blob], blob.name + blob.lastModified, { type: blob.type });
    const compressedImage = await compressImage(originalImage);

    try {
      const { SIGNED_URL, IMG_URL } = (await getFileUploadUrl()).RESULTS.DATAS;
      const { status: awsUploadStatus } = await awsUpload(compressedImage, SIGNED_URL);

      const fileName = compressedImage.name;
      const fileType = '.' + compressedImage.type.split('/')[1];
      const uploadKey = IMG_URL.split('/').pop() as string;

      if (awsUploadStatus === 200) {
        appendAttachmentIds(uploadKey);
        const response = await uploadEditorFile(userId, fileName, fileType, uploadKey, postIndex);
        return response.RESULTS.DATAS.IMG_URL;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

const compressImage = async (file: File) => {
  const compressed = await imageCompression(file, { maxSizeMB: 0.5 });
  return new File([compressed], `${file.name}_resized`, { type: file.type });
};

const awsUpload = async (file: File, url: string) => {
  return await axios.put(url, file, { headers: { 'Content-Type': file.type } });
};
