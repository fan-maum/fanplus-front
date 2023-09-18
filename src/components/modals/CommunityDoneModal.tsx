import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import { TargetType, selectInfoType } from '@/types/common';

export interface DialogBlockDoneProps {
  opened: boolean;
  selectInfo: selectInfoType;
  texts: CommunityPostTextType;
  onClose: () => void;
}

function CommunityDoneModal({ onClose, opened, selectInfo, texts, ...props }: DialogBlockDoneProps) {
  const communityDeleteDoneModalProps: CommunityCommonModalProps = {
    opened,
    onClose,
    confirmButton: {
      onClick: onClose,
      text: texts.confirmButton,
    },
  };
  const { purpose, target_type, idx } = selectInfo;
  
  const modalText = (purpose === 'delete' ? (target_type === 'post' ? texts.postDeleted : texts.commentDeleted) : '')
  return (
    <>
      <CommunityCommonModal {...communityDeleteDoneModalProps}>
      <CommunityModalText
          voteText={
            <>
              <Group spacing={6} position="center">
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>
                  {modalText}
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