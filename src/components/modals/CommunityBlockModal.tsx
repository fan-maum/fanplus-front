import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { checkCommentState, selectInfoState } from '@/store/community';
import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import { deleteComment, deletePost } from '@/api/Community';

export interface VoteBlockModalProps {
  opened: boolean;
  onClose: () => void;
  texts: CommunityPostTextType;
  identity: string;
  setModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalMessage: React.Dispatch<React.SetStateAction<any>>;
  refetch: () => void;
  replyRefetch: () => void;
}

function CommunityBlockModal({
  onClose,
  opened,
  texts,
  identity,
  setModalBlock,
  setDoneModalBlock,
  setDoneModalMessage,
  refetch,
  replyRefetch,
  ...props
}: VoteBlockModalProps) {
  const selectInfo = useRecoilValue(selectInfoState);
  const { purpose, target_type, idx } = selectInfo;
  const modalText =
    purpose === 'delete'
      ? target_type === 'post'
        ? texts.askPostDelete
        : texts.askCommentDelete
      : '';

  const router = useRouter();
  const checkComment = useRecoilValue(checkCommentState);

  const communityDeleteModalProps: CommunityCommonModalProps = {
    buttonId: 'modalAppDownloadButton',
    opened,
    onClose,
    cancelButton: { text: texts.cancelButton, onClick: onClose },
    confirmButton: {
      onClick: async () => {
        setModalBlock(false);
        if (target_type === 'post') {
          let response = await deletePost(identity, idx, 'remove');
          let modalMessage =
            response?.data?.RESULTS?.MSG === 'success' ? texts.postDeleted : texts.alreadyDeleted;
          setDoneModalMessage(modalMessage);
          setDoneModalBlock(true);
          router.replace(`/community/board/${router.query.boardIndex}`);
        }
        if (target_type === 'comment') {
          let response = await deleteComment(identity, idx);
          let modalMessage =
            response?.data?.RESULTS?.MSG === '삭제 성공'
              ? texts.commentDeleted
              : texts.alreadyDeleted;
          setDoneModalMessage(modalMessage);
          setDoneModalBlock(true);
          checkComment ? refetch() : replyRefetch();
        }
      },
      text: texts.confirmButton,
    },
  };

  return (
    <>
      <CommunityCommonModal {...communityDeleteModalProps}>
        <CommunityModalText
          text={
            <>
              <Group spacing={6} position="center" css={{ flexDirection: 'column' }}>
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>{modalText}</div>
                <div css={{ fontSize: 14, fontWeight: 500, color: '#999' }}>
                  {purpose === 'delete' && target_type === 'post' && texts.askPostDeleteMsg}
                </div>
              </Group>
            </>
          }
        />
      </CommunityCommonModal>
    </>
  );
}

export default CommunityBlockModal;
