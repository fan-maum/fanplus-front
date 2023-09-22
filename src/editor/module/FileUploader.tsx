import Uppy, { UploadedUppyFile } from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import Compressor from '@uppy/compressor';
import { AwsS3 } from 'uppy';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dispatch, SetStateAction } from 'react';
import { getFileUploadUrl } from '@/api/Community';

const grandTotalFileSizeLimit = 10 * 1000 * 1000; // 10MB

type OwnPropType = {
  state: [open: boolean, setOpen: Dispatch<SetStateAction<boolean>>];
  uploadCallback: (
    file: UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>
  ) => Promise<void>;
};

const FileUploader = ({ state: [open, setOpen], uploadCallback }: OwnPropType) => {
  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
    restrictions: {
      maxFileSize: null,
      maxNumberOfFiles: null,
      minNumberOfFiles: null,
      allowedFileTypes: ['image/*'],
    },
    onBeforeFileAdded: (currentFile, files) => {
      const totalFileSize = Object.keys(files).reduce((prev, filename) => {
        const file = files[filename];
        return prev + file.size;
      }, 0);
      const grandTotalFileSize = currentFile.data.size + totalFileSize;
      if (grandTotalFileSize >= grandTotalFileSizeLimit) {
        const LimitInMB = grandTotalFileSizeLimit / (1000 * 1000);
        const text = `파일 업로드 최대 용량(${LimitInMB}MB)을 초과했습니다.`;
        uppy.info(text, 'error', 3000);
        return false;
      }
      return true;
    },
  })
    .use(Compressor, { quality: 0.75 })
    .use(AwsS3, {
      async getUploadParameters(file) {
        const { SIGNED_URL, IMG_URL } = (await getFileUploadUrl()).RESULTS.DATAS;
        file.meta.uploadUrl = IMG_URL;
        return {
          method: 'PUT',
          url: SIGNED_URL,
          fields: {},
        };
      },
    })
    .on('complete', (result) => {
      result.successful.map(async (file) => {
        await uploadCallback(file);
      });
    });

  return (
    <>
      <DashboardModal
        uppy={uppy}
        open={open}
        onRequestClose={() => setOpen(false)}
        proudlyDisplayPoweredByUppy={false}
        disablePageScrollWhenModalOpen={false}
        closeAfterFinish={true}
        css={{
          '.uppy-Dashboard-inner': { '@media(max-width:768px)': { height: '50%', top: '25%' } },
        }}
      />
    </>
  );
};

export default FileUploader;
