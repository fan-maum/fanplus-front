import FullEditor from '@/editor/screen/FullEditor';
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, useRef, useState } from 'react';
import { EditorModalTextType } from '@/types/textTypes';
import { TopicListItemType } from '@/types/community';
import IconArrowLeft from '../atoms/IconArrowLeft';
import { useRouter } from 'next/router';
import EditorTopicSet from '../molecules/community/EditorTopicSet';

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

    cancelModal: EditorModalTextType;
    registerModal: EditorModalTextType;
    modifyModal: EditorModalTextType;
  };

  topics: TopicListItemType[];

  defaultValues?: {
    topicIndex: number;
    title: string;
    content: string;
  };
};

const PostEditorTemplate = ({ topics }: { topics: TopicListItemType[] }) => {
  const router = useRouter();

  const isCreateMode = true; // TODO: write.tsx가 호출 중일 때 (새로 작성)
  const isModifyMode = false; // TODO: edit.tsx가 호출 할 때 (수정)

  const editorRef = useRef();
  const editorId = 'postEditor';

  const [topicIdx, setTopicIdx] = useState(topics[0].IDX); // TODO: defaultValues의 topicIndex 가 더 우선
  const [title, setTitle] = useState(''); // TODO: defaultValue의 title 이 더 우선 되고 없으면 ''
  const [content, setContent] = useState(''); // TODO: defaultValue의 content가 더 우선되고 없으면 ''

  const [cancelModal, setCancelModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  const onClickCancel: MouseEventHandler = (event) => {
    event.preventDefault();
    setCancelModal(true);
  };
  const onClickRegister: MouseEventHandler = (event) => {
    event.preventDefault();
    setRegisterModal(true);
    // @ts-ignore
    setContent(editorRef.current.get(editorId).getContent());
  };
  const onClickModify: MouseEventHandler = (event) => {
    event.preventDefault();
    setModifyModal(true);
    // @ts-ignore
    setContent(editorRef.current.get(editorId).getContent());
  };

  return (
    <main
      css={{
        width: '100%',
        maxWidth: '768px',
        margin: '0px auto',
      }}
    >
      <form css={{ padding: '0px 10px' }}>
        <div css={{ display: 'flex', marginBottom: '30px' }}>
          <IconArrowLeft
            iconCss={{ marginRight: '5px', width: '30px', height: '30px', cursor: 'pointer' }}
            onClickBack={() => router.back()}
          />
          <h2>글쓰기</h2>
        </div>
        <StyledBar>
          <h2>토픽</h2>
          <EditorTopicSet topics={topics} topicIdx={topicIdx} setTopicIdx={setTopicIdx} />
        </StyledBar>
        <StyledBar>
          <h2>제목</h2>
          <TitleInput placeholder="제목을 입력하세요" title={title} setTitle={setTitle} />
        </StyledBar>
        <StyledBar>
          <h2>내용</h2>
        </StyledBar>
        <FullEditor editorRef={editorRef} editorId={editorId} defaultValue={content} />
        <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button text="취소" onClick={onClickCancel} />
          {isCreateMode && <Button text="등록" onClick={onClickRegister} highlight />}
          {isModifyMode && <Button text="수정" onClick={onClickModify} highlight />}
        </div>
      </form>
    </main>
  );
};

export default PostEditorTemplate;

const StyledBar = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        margin: '8px 4px',
        height: '40px',
        h2: { marginRight: '30px', fontWeight: '600' },
      }}
    >
      {children}
    </div>
  );
};

const TitleInput = ({
  placeholder,
  title,
  setTitle,
}: {
  placeholder: string;
  title?: string;
  setTitle: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <input
      css={{
        height: '40px',
        width: 'calc(100% - 150px)',
        maxWidth: '480px',
        border: '1.8px solid #e6e6e6',
        borderRadius: '4px',
        paddingLeft: '10px',
        outline: 'none',
        fontSize: '18px',
        '::placeholder': { color: '#d9d9d9', fontSize: '16px' },
      }}
      placeholder={placeholder}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

const Button = ({
  highlight,
  text,
  onClick,
}: {
  highlight?: boolean;
  text: string;
  onClick: MouseEventHandler;
}) => {
  return (
    <button
      css={{
        padding: '7px 21px',
        fontSize: '16px',
        fontWeight: '500',
        margin: '10px 5px 60px',
        borderRadius: '7px',
        border: highlight ? 'transparent' : '1.5px solid #e6e6e6',
        backgroundColor: highlight ? '#ff5656' : '#fff',
        color: highlight ? '#fff' : '#101010',
        ':active': { backgroundColor: highlight ? '#e64d4d' : '#f2f4f5' },
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
