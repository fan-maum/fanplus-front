import { editBoardArticle, postBoardArticle, uploadEditorFile } from '@/api/Community';
import FullEditor from '@/editor/screen/FullEditor';
import { imagesUploadHandler } from '@/editor/util/imagesUploadHandler';
import { communityPostEditorTexts } from '@/texts/communityPostEditorTexts';
import type { ServerLangType, UrlLangType } from '@/types/common';
import type { TopicListItemType } from '@/types/community';
import { UploadedUppyFile } from '@uppy/core';
import { useRouter } from 'next/router';
import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TinyMCE } from '../../../public/tinymce/tinymce';
import IconArrowLeft from '../atoms/IconArrowLeft';
import CommunityCommonModal from '../modals/CommunityCommonModal';
import CommunityEditorCommonModal from '../modals/CommunityEditorModal';
import EditorTopicSet from '../molecules/community/EditorTopicSet';
import BoardMobileTitle from '../molecules/community/mobile/BoardMobileTitle';

type OwnPropType = {
  mode: 'CREATE' | 'EDIT';
  urlLang: UrlLangType;
  topics: TopicListItemType[];
  datas: {
    userId: string;
    boardIndex: number;
    postIndex?: number;
    boardLang: ServerLangType;
    serverLang: ServerLangType;
  };
  defaultValues?: {
    topicIndex?: number;
    title?: string;
    content?: string;
  };
};

const PostEditorTemplate = ({ mode, urlLang, topics, datas, defaultValues }: OwnPropType) => {
  const router = useRouter();
  const texts = communityPostEditorTexts[urlLang];

  const isCreateMode = mode === 'CREATE';
  const { userId, boardIndex, postIndex, boardLang, serverLang } = datas;

  const editorRef = useRef<TinyMCE>();
  const editorId = 'postEditor';

  const [topicIndex, setTopicIndex] = useState(defaultValues?.topicIndex || topics[0].IDX);
  const [title, setTitle] = useState(defaultValues?.title || '');
  const [content, setContent] = useState(defaultValues?.content || '');
  const [attachmentIds, setAttachmentIds] = useState<Array<string>>([]);

  const [cancelModal, setCancelModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [dataLackModal, setDataLackModal] = useState(false);

  const [uploadClicked, setUploadClicked] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => (e.returnValue = '');
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
    const content = editorRef?.current?.get(editorId)?.getContent() || '';
    setContent(content);
    if (!title || !content) {
      setDataLackModal(true);
      return;
    }
    setUploadModal(true);
  };

  const onClickUploadConfirm = async () => {
    if (uploadClicked) return;
    setUploadClicked(true);
    const postId = isCreateMode
      ? (
          await postBoardArticle(
            userId,
            boardIndex,
            serverLang,
            topicIndex,
            title,
            content,
            attachmentIds
          )
        ).RESULTS.DATAS.POST_IDX
      : (postIndex as number);
    if (!isCreateMode) {
      await editBoardArticle(userId, postId, serverLang, topicIndex, title, content);
    }
    setUploadModal(false);
    router.replace(`/${urlLang}/community/board/${boardIndex}/${postId}/`);
  };

  const onClickExit = () => {
    setCancelModal(false);
    router.back();
  };

  const appendAttachmentIds = (uploadKey: string) => {
    setAttachmentIds((prev) => [...prev, uploadKey]);
  };

  const uppyFileUploadHandler = async (
    file: UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>
  ) => {
    const uploadKey = (file.meta.uploadUrl as string).split('/').pop() as string;
    const fileName = file.name.split('.')[0];
    const fileType = '.' + (file.type as string).split('/')[1];

    appendAttachmentIds(uploadKey);
    const response = await uploadEditorFile(userId, fileName, fileType, uploadKey, postIndex);
    editorRef.current?.activeEditor?.insertContent(
      `<img src="${response.RESULTS.DATAS.IMG_URL}" />`
    );
  };

  return (
    <main>
      <form css={{ padding: '0px 10px' }}>
        <div css={{ marginBottom: '30px' }}>
          <BoardMobileTitle boardTitle={texts.pageTitle} onClickBack={() => setCancelModal(true)} />
        </div>
        <StyledBar>
          <h2>{texts.topic}</h2>
          <EditorTopicSet topics={topics} topicIndex={topicIndex} setTopicIndex={setTopicIndex} />
        </StyledBar>
        <StyledBar>
          <h2>{texts.title}</h2>
          <TitleInput
            placeholder={texts.titlePlaceholder}
            defaultValue={defaultValues?.title}
            setTitle={setTitle}
          />
        </StyledBar>
        <StyledBar>
          <h2>{texts.content}</h2>
        </StyledBar>
        <FullEditor
          editorRef={editorRef}
          editorId={editorId}
          defaultValue={defaultValues?.content}
          language={urlLang}
          uppyFileUploadHandler={uppyFileUploadHandler}
          imagesUploadHandler={imagesUploadHandler(userId, appendAttachmentIds, postIndex)}
        />
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
      <CommunityCommonModal
        opened={dataLackModal}
        onClose={() => setDataLackModal(false)}
        confirmButton={{ onClick: () => setDataLackModal(false), text: texts.modal.check }}
      >
        {!title ? texts.modal.enterTitle : texts.modal.enterContent}
      </CommunityCommonModal>
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
        h2: { marginRight: '30px', fontWeight: '600', fontSize: '18px' },
      }}
    >
      {children}
    </div>
  );
};

const TitleInput = ({
  placeholder,
  defaultValue,
  setTitle,
}: {
  placeholder: string;
  defaultValue?: string;
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
      defaultValue={defaultValue}
      onBlur={(e) => setTitle(e.target.value)}
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
        padding: '6px 21px',
        fontSize: '16px',
        fontWeight: '500',
        margin: '10px 5px 60px',
        borderRadius: '6px',
        border: fancy ? 'transparent' : '1.5px solid #e6e6e6',
        backgroundColor: fancy ? '#ff5656' : '#fff',
        color: fancy ? '#fff' : '#101010',
        cursor: 'pointer',
        ':active': { backgroundColor: fancy ? '#e64d4d' : '#f2f4f5' },
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
