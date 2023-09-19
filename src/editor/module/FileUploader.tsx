import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import Compressor from '@uppy/compressor';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dispatch, SetStateAction } from 'react';
import { AwsS3 } from 'uppy';
import { getFileUploadUrl, uploadEditorFile } from '@/api/Community';
import { BackLangType } from '@/types/common';

const grandTotalFileSizeLimit = 10 * 1000 * 1000; // 10MB

type OwnPropType = {
  editorRef: any;
  state: [open: boolean, setOpen: Dispatch<SetStateAction<boolean>>];
  datas: {
    userId: string;
    boardIndex: number;
    postIndex: number;
    boardLang: BackLangType;
    lang: BackLangType;
  };
};

const FileUploader = ({ editorRef, state: [open, setOpen], datas }: OwnPropType) => {
  const { userId, boardIndex, postIndex, boardLang, lang } = datas;

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
    .use(Compressor, { quality: 0.7 })
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
      console.log(result.successful);
      result.successful.map(async (file) => {
        const uploadKey = (file.meta.uploadUrl as string).split('/').pop();
        const response = await uploadEditorFile(
          userId,
          postIndex,
          file.name,
          file.type as string,
          uploadKey as string
        );
        editorRef.current.activeEditor.insertContent(
          `<img src="${response.RESULTS.DATAS.IMG_URL}" />`
        );
      });
      // eslint-disable-next-line no-console
      console.log('upload complete');
    });

  return (
    <>
      <DashboardModal
        uppy={uppy}
        open={open}
        onRequestClose={() => setOpen(false)}
        proudlyDisplayPoweredByUppy={false}
        disablePageScrollWhenModalOpen={false}
        css={{
          '.uppy-Dashboard-inner': { '@media(max-width:768px)': { height: '50%', top: '25%' } },
        }}
      />
    </>
  );
};

export default FileUploader;
