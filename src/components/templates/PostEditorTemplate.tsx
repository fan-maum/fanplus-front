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
        <h2>글쓰기</h2>
        <div css={{ display: 'flex' }}>
          <h2>토픽</h2>
        </div>
        <div css={{ display: 'flex' }}>
          <h2>제목</h2>
          <input placeholder="제목을 입력해주세요." />
        </div>
        <h2>내용</h2>
        <FullEditor editorRef={editorRef} editorId={editorId} defaultValue="" />
        <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={(e) => e.preventDefault()}>취소</button>
          <button onClick={(e) => e.preventDefault()}>등록</button>
        </div>
      </form>
    </main>
  );
};

export default PostEditorTemplate;
