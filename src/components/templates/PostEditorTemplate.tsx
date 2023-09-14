import FullEditor from '@/editor/screen/FullEditor';
import { useRef } from 'react';

type ModalTextType = {
  main: string;
  cancel: string;
  confirm: string;
};

type OwnPropType = {
  mode: 'CREATE' | 'MODIFY';

  texts: {
    pageTitle: string;
    topic: string;
    topicTitle: string[];
    title: string;
    content: string;
    cancel: string;
    register: string;
    modify: string;
  };

  exitModal: ModalTextType;
  registerModal: ModalTextType;
  modifyModal: ModalTextType;

  defaultValues?: {
    topicIndex: number;
    title: string;
    content: string;
  };
};

const PostEditorTemplate = () => {
  const editorRef = useRef();
  const editorId = 'postEditor';

  return (
    <main
      css={{
        width: '100%',
        maxWidth: '768px',
        margin: '0px auto',
      }}
    >
      <form css={{ padding: '5px' }}>
        <FullEditor editorRef={editorRef} editorId={editorId} defaultValue="" />
      </form>
    </main>
  );
};

export default PostEditorTemplate;
