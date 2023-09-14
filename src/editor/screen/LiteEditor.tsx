import React, { useState, useEffect } from 'react';
import { useSimpleTinyMCEConfig } from '../module/useSimpleTinyMCEConfig';
import { useIOSIMESetting } from '../module/useIOSIMESetting';
import Script from 'next/script';

type TProps = {
  editorRef: any;
  editorId: string;
  defaultValue?: string;
  texts?: {
    placeholder: string;
    submitButton: string;
  };
};

const LiteEditor: React.FC<TProps> = ({
  editorRef,
  editorId,
  defaultValue,
  texts = { placeholder: '댓글을 남겨주세요. (200자)', submitButton: '등록' },
}) => {
  const [isJsLoading, setIsJsLoading] = useState(true);

  const editorLoadedComplete = () => {
    if (defaultValue && editorRef.current) {
      editorRef.current.get(editorId).setContent(defaultValue);
    }
  };

  useEffect(() => {
    if ((window as any)?.tinymce) setIsJsLoading(false);
    if (isJsLoading) return;

    editorRef.current = (window as any)?.tinymce;
    editorRef.current?.remove();

    editorRef.current.init({
      ...useSimpleTinyMCEConfig(),
      selector: `#${editorId}`,
      placeholder: texts.placeholder,
      init_instance_callback: () => editorLoadedComplete(),
      valid_elements: 'b,strong,i,em,u,strike,sup,sub,p,br,ol,ul,li',
      //@ts-ignore
      setup: (editor) => {
        useIOSIMESetting(editor);

        editor.on('focus', () => editor.getBody().classList.add('placeholder'));
        editor.on('blur', () => editor.getBody().classList.remove('placeholder'));
      },
    });
  }, [isJsLoading]);

  return (
    <>
      <div css={{ position: 'relative' }}>
        <Script src="/tinymce/tinymce.min.js" onLoad={() => setIsJsLoading(false)} />
        {!isJsLoading && (
          <div
            css={{
              width: 'calc(100% - 60px)',
              backgroundColor: '#fff',
              height: '62px',
              padding: '5px',
              overflow: 'scroll',
              outline: 'none',
              // scrollbarWidth: 'none',
              // '::-webkit-scrollbar': { display: 'none' },
              // msOverflowStyle: 'none',
              '.placeholder::before': { opacity: 0 },
            }}
            className="editor-wrapper"
          >
            <div
              css={{
                '::before': {
                  marginLeft: '15px',
                  fontSize: '14px',
                  color: '#c9c9c9 !important',
                  fontWeight: '400 !important',
                },
                outline: 'none',
              }}
              className="simple-editor"
              id={editorId}
            />
          </div>
        )}
        <SubMitButton text={texts.submitButton} />
      </div>
      <div css={{ height: '300px', backgroundColor: 'yellowgreen' }}></div>
      <div css={{ height: '300px', backgroundColor: 'yellowgreen' }}></div>
      <div css={{ height: '300px', backgroundColor: 'yellowgreen' }}></div>
    </>
  );
};

export default LiteEditor;

const SubMitButton = ({ text }: { text: string }) => {
  return (
    <button
      css={{
        position: 'absolute',
        bottom: '11px',
        right: '5px',
        padding: '0px 12px',
        height: '40px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '500',
        letterSpacing: '1.2px',
        backgroundColor: '#ff5656',
        border: 'none',
        borderRadius: '5px',
        zIndex: '1',
        ':active': { backgroundColor: '#e64d4d' },
      }}
      onClick={() => {}}
    >
      {text}
    </button>
  );
};
