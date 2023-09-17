import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import { TargetType } from '@/types/common';

export interface DialogBlockDoneProps {
  opened: boolean;
  texts: CommunityPostTextType;
  onClose: () => void;
}

function CommunityDoneModal({ onClose, opened, texts, ...props }: DialogBlockDoneProps) {
  const communityDeleteDoneModalProps: CommunityCommonModalProps = {
    opened,
    onClose,
    confirmButton: {
      onClick: onClose,
      text: texts.confirmButton,
    },
  };
  return (
    <>
      <CommunityCommonModal {...communityDeleteDoneModalProps}>
      <CommunityModalText
          voteText={
            <>
              <Group spacing={6} position="center">
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>
                  {"게시글이 삭제되었습니다."}
                </div>
              </Group>
              {/* <div
                css={{ fontSize: 18, fontWeight: 400 }}
              >
              </div> */}
            </>
          }
        />
      </CommunityCommonModal>
    </>
  );
}

export default CommunityDoneModal;