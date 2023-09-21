import React, { useEffect, useState } from 'react';
import { useTinyMCEConfig } from '../module/useTinyMCEConfig';
import { useIOSIMESetting } from '../module/useIOSIMESetting';
import {
  useCustomImageButton,
  useCustomVideoButton,
  useCustomYoutubeButton,
} from '../constant/customButtons';
import Script from 'next/script';
import FileUploader from '../module/FileUploader';
import { BackLangType } from '@/types/common';
import { Editor } from '../../../public/tinymce/tinymce';

type TProps = {
  editorRef: any;
  editorId: string;
  defaultValue?: string;
  fileUploadCallback: (file: any) => Promise<void>;
};

const FullEditor: React.FC<TProps> = ({
  editorRef,
  editorId,
  defaultValue,
  fileUploadCallback,
}) => {
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
      ...useTinyMCEConfig(),
      selector: `#${editorId}`,
      init_instance_callback: () => editorLoadedComplete(),
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
              },
            }}
            className="editor-wrap"
          >
            <div className="selector-editor-wrap">
              <div className="selector-editor-scrollbox">
                <div id={editorId} className="selector-editor" />
              </div>
            </div>
            <FileUploader state={[modalOpen, setModalOpen]} uploadCallback={fileUploadCallback} />
          </div>
        </>
      )}
    </>
  );
};

export default FullEditor;
