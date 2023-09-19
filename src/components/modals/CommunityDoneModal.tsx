import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import { TargetType, selectInfoType } from '@/types/common';

export interface DialogBlockDoneProps {
  opened: boolean;
  selectInfo: selectInfoType;
  doneModalMessage?: any;
  texts: CommunityPostTextType;
  onClose: () => void;
}

function CommunityDoneModal({
  onClose,
  opened,
  selectInfo,
  doneModalMessage,
  texts,
  ...props
}: DialogBlockDoneProps) {
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
            <Group spacing={6} position="center">
              <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>
                {doneModalMessage}
              </div>
            </Group>
          }
        />
      </CommunityCommonModal>
    </>
  );
}

export default CommunityDoneModal;
