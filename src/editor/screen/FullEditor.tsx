import type { UrlLangType } from '@/types/common';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import type { Editor } from '../../../public/tinymce/tinymce';
import {
  useCustomImageButton,
  useCustomVideoButton,
  useCustomYoutubeButton,
} from '../constant/customButtons';
import FileUploader from '../module/FileUploader';
import { useIOSIMESetting } from '../module/useIOSIMESetting';
import { useTinyMCEConfig } from '../module/useTinyMCEConfig';

type TProps = {
  editorRef: any;
  editorId: string;
  defaultValue?: string;
  language: UrlLangType;
  uppyFileUploadHandler: (file: any) => Promise<void>;
  imagesUploadHandler: (blobInfo: any) => Promise<string | undefined>;
};

const FullEditor = ({
  editorRef,
  editorId,
  defaultValue,
  language,
  uppyFileUploadHandler,
  imagesUploadHandler,
}: TProps) => {
  const [isJsLoading, setIsJsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const editorLoadedComplete = () => {
    if (defaultValue && editorRef.current) {
      editorRef.current.get(editorId).setContent(defaultValue);
    }
  };

  useEffect(() => {
    if (window?.tinymce) setIsJsLoading(false);
    if (isJsLoading) return;

    editorRef.current = window?.tinymce;
    editorRef.current?.remove();

    editorRef.current.init({
      ...useTinyMCEConfig(language),
      selector: `#${editorId}`,
      init_instance_callback: editorLoadedComplete,
      images_upload_handler: imagesUploadHandler,

      setup: (editor: Editor) => {
        useIOSIMESetting(editor);

        const onCustomAction = () => setModalOpen(true);
        useCustomImageButton({ editor, onCustomAction });
        useCustomVideoButton({ editor, onCustomAction });
        useCustomYoutubeButton({ editor });
      },
    });
  }, [isJsLoading]);

  return (
    <>
      <Script src="/tinymce/tinymce.min.js" onLoad={() => setIsJsLoading(false)} />
      {!isJsLoading && (
        <>
          <div
            css={{
              width: '100%',
              margin: '0px auto',
              '.tox-editor-header': {
                boxShadow: 'none !important',
                padding: '0px !important',
              },
              '.tox-toolbar': {
                borderBottom: '1px solid #d9d9d9',
                padding: '2px 0px !important',
                '::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              },
            }}
            className="editor-wrap"
          >
            <div className="selector-editor-wrap">
              <div className="selector-editor-scrollbox">
                <div id={editorId} className="selector-editor" />
              </div>
            </div>
            <FileUploader
              state={[modalOpen, setModalOpen]}
              uploadCallback={uppyFileUploadHandler}
            />
          </div>
        </>
      )}
    </>
  );
};

export default FullEditor;
