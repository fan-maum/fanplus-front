import FullEditor from '@/editor/screen/FullEditor';
import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CommunityPostEditorTextType } from '@/types/textTypes';
import { TopicListItemType } from '@/types/community';
import IconArrowLeft from '../atoms/IconArrowLeft';
import { useRouter } from 'next/router';
import EditorTopicSet from '../molecules/community/EditorTopicSet';
import CommunityEditorCommonModal from '../modals/CommunityEditorModal';
import { editBoardArticle } from '@/api/Community';
import { BackLangType } from '@/types/common';

type OwnPropType = {
  mode: 'CREATE' | 'EDIT';
  topics: TopicListItemType[];
  texts: CommunityPostEditorTextType;
  datas: {
    userId: string;
    boardIndex: number;
    postIndex: number;
    boardLang: BackLangType;
    lang: BackLangType;
  };
  defaultValues?: {
    topicIndex: number;
    title: string;
    content: string;
  };
};

const PostEditorTemplate = ({ mode, topics, texts, datas, defaultValues }: OwnPropType) => {
  const router = useRouter();

  const isCreateMode = mode === 'CREATE';
  const { userId, boardIndex, postIndex, boardLang, lang } = datas;

  const editorRef = useRef();
  const editorId = 'postEditor';

  const [topicIdx, setTopicIdx] = useState(defaultValues?.topicIndex || topics[0].IDX);
  const [title, setTitle] = useState(defaultValues?.title || '');
  const [content, setContent] = useState(defaultValues?.content || '');

  const [cancelModal, setCancelModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.returnValue = '';
      return '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const onClickCancel: MouseEventHandler = (event) => {
    event.preventDefault();
    setCancelModal(true);
  };
  const onClickUpload: MouseEventHandler = (event) => {
    event.preventDefault();
    setUploadModal(true);
    // @ts-ignore
    setContent(editorRef.current.get(editorId).getContent());
  };

  const onClickUploadConfirm = async () => {
    setUploadModal(false);
    const response = await editBoardArticle(
      userId,
      postIndex,
      boardLang,
      lang,
      title,
      content,
      topicIdx
    );
    if (response.RESULTS.ERROR) {
      alert('다시 시도해주세요.');
      return;
    }
    router.replace(`/${lang}/community/board/${boardIndex}/${postIndex}/`);
  };
  const onClickExit = () => {
    setCancelModal(false);
    router.back();
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
        <div css={{ display: 'flex', marginBottom: '30px', alignItems: 'center' }}>
          <IconArrowLeft
            iconCss={{ marginRight: '5px', width: '30px', height: '30px', cursor: 'pointer' }}
            onClickBack={() => setCancelModal(true)}
          />
          <h2 css={{ lineHeight: '30px' }}>{texts.pageTitle}</h2>
        </div>
        <StyledBar>
          <h2>{texts.topic}</h2>
          <EditorTopicSet topics={topics} topicIdx={topicIdx} setTopicIdx={setTopicIdx} />
        </StyledBar>
        <StyledBar>
          <h2>{texts.title}</h2>
          <TitleInput placeholder={texts.titlePlaceholder} title={title} setTitle={setTitle} />
        </StyledBar>
        <StyledBar>
          <h2>{texts.content}</h2>
        </StyledBar>
        <FullEditor editorRef={editorRef} editorId={editorId} defaultValue={content} />
        <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button text={texts.cancel} onClick={onClickCancel} />
          <Button text={texts[isCreateMode ? 'upload' : 'edit']} onClick={onClickUpload} fancy />
        </div>
      </form>
      <CommunityEditorCommonModal
        texts={{ main: texts.modal[isCreateMode ? 'upload' : 'edit'] }}
        cancelButton={{ text: texts.modal.cancel, onClick: () => setUploadModal(false) }}
        confirmButton={{ text: texts.modal.check, onClick: onClickUploadConfirm }}
        opened={uploadModal}
        onClose={() => setUploadModal(false)}
      />
      <CommunityEditorCommonModal
        texts={{
          main: texts.modal[isCreateMode ? 'cancelUpload' : 'cancelEdit'],
          sub: isCreateMode ? texts.modal.cancelUploadSub : '',
        }}
        cancelButton={{ text: texts.modal.cancel, onClick: () => setCancelModal(false) }}
        confirmButton={{ text: texts.modal.check, onClick: onClickExit }}
        opened={cancelModal}
        onClose={() => setCancelModal(false)}
      />
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
        width: 'calc(100% - 135px)',
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
  fancy,
  text,
  onClick,
}: {
  fancy?: boolean;
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
        border: fancy ? 'transparent' : '1.5px solid #e6e6e6',
        backgroundColor: fancy ? '#ff5656' : '#fff',
        color: fancy ? '#fff' : '#101010',
        ':active': { backgroundColor: fancy ? '#e64d4d' : '#f2f4f5' },
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
