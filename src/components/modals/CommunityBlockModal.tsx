import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import { PurPoseType, TargetType } from '@/types/common';
import { deleteComment } from '@/api/Community';

export interface VoteBlockModalProps {
  opened: boolean;
  onClose: () => void;
  texts: CommunityPostTextType;
  selectInfo: {
    purpose: PurPoseType
    target_type: TargetType, 
    idx: string
  },
  identity: string;
  setModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

function CommunityBlockModal({ onClose, opened, texts, selectInfo, identity, setModalBlock, setDoneModalBlock, refetch, ...props }: VoteBlockModalProps) {
  const {purpose, target_type, idx} = selectInfo;
  
  const communityDeleteModalProps: CommunityCommonModalProps = {
    buttonId: 'modalAppDownloadButton',
    opened,
    onClose,
    cancelButton: { text: texts.cancelButton, onClick: onClose },
    confirmButton: {
      onClick: async () => {
        setModalBlock(false);
        setDoneModalBlock(true);
        if(target_type === 'post') await deleteComment(identity, idx);
        if(target_type === 'comment') await deleteComment(identity, idx);
        await refetch();
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
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>
                  {"게시글을 삭제하시겠어요?"}
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