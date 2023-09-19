import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import { selectInfoType } from '@/types/common';
import { deleteComment, deletePost } from '@/api/Community';
import { useRouter } from 'next/router';

export interface VoteBlockModalProps {
  opened: boolean;
  onClose: () => void;
  texts: CommunityPostTextType;
  selectInfo: selectInfoType;
  identity: string;
  setModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalMessage: React.Dispatch<React.SetStateAction<any>>;
  refetch: () => void;
}

function CommunityBlockModal({
  onClose,
  opened,
  texts,
  selectInfo,
  identity,
  setModalBlock,
  setDoneModalBlock,
  setDoneModalMessage,
  refetch,
  ...props
}: VoteBlockModalProps) {
  const { purpose, target_type, idx } = selectInfo;
  const modalText =
    purpose === 'delete'
      ? target_type === 'post'
        ? texts.askPostDelete
        : texts.askCommentDelete
      : '';

  const router = useRouter();

  const communityDeleteModalProps: CommunityCommonModalProps = {
    buttonId: 'modalAppDownloadButton',
    opened,
    onClose,
    cancelButton: { text: texts.cancelButton, onClick: onClose },
    confirmButton: {
      onClick: async () => {
        setModalBlock(false);
        setDoneModalBlock(true);
        if (target_type === 'post') {
          let response = await deletePost(identity, idx, 'remove');
          let modalMessage =
            response?.data?.RESULTS?.MSG === 'success' ? texts.postDeleted : texts.alreadyDeleted;
          setDoneModalMessage(modalMessage);
          router.push(`/community/board/${router.query.boardIndex}`);
        }
        if (target_type === 'comment') {
          let response = await deleteComment(identity, idx);
          let modalMessage =
            response?.data?.RESULTS?.MSG === 'success'
              ? texts.commentDeleted
              : texts.alreadyDeleted;
          setDoneModalMessage(modalMessage);
          await refetch();
        }
      },
      text: texts.confirmButton,
    },
  };

  return (
    <>
      <CommunityCommonModal {...communityDeleteModalProps}>
        <CommunityModalText
          voteText={
            <>
              <Group spacing={6} position="center">
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>{modalText}</div>
              </Group>
            </>
          }
        />
      </CommunityCommonModal>
    </>
  );
}

export default CommunityBlockModal;
