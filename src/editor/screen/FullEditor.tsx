import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useTinyMCEConfig } from '../module/useTinyMCEConfig';
import { useIOSIMESetting } from '../module/useIOSIMESetting';
import {
  useCustomImageButton,
  useCustomVideoButton,
  useCustomYoutubeButton,
} from '../constant/customButtons';
import Script from 'next/script';

type TProps = {
  editorRef: any;
  editorId: string;
  defaultValue?: string;
};

const FullEditor: React.FC<TProps> = ({ editorRef, editorId, defaultValue }) => {
  const [isJsLoading, setIsJsLoading] = useState(true);

  const log: MouseEventHandler<HTMLButtonElement> = (e) => {
    // eslint-disable-next-line no-console
    console.log(editorRef.current.get(editorId).getContent());
    e.preventDefault();
  };

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
      // images_upload_handler: imagesUploadHandler, // TODO: Uppy와 연결시..
      init_instance_callback: () => editorLoadedComplete(),
      // @ts-ignore
      setup: (editor) => {
        useIOSIMESetting(editor);

        const onCustomAction = () => {};
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
          </div>
        </>
      )}
      <button onClick={log}>로그</button>
    </>
  );
};

export default FullEditor;
