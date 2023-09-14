import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';

export interface VoteBlockModalProps {
  opened: boolean;
  onClose: () => void;
  texts: CommunityPostTextType;
}

function CommunityDeleteModal({ onClose, opened, texts, ...props }: VoteBlockModalProps) {
  const voteBlockModalProps: CommunityCommonModalProps = {
    buttonId: 'modalAppDownloadButton',
    opened,
    onClose,
    cancelButton: { text: texts.cancelButton, onClick: onClose },
    confirmButton: {
      onClick: () => {
        // if (!isWebView && onWebViewLink) {
        //   onWebViewLink();
        // } else {
        //   onClose();
        // }
      },
      text: texts.confirmButton,
    },
  };
  return (
    <>
      <CommunityCommonModal {...voteBlockModalProps}>
        <CommunityModalText
          voteText={
            <>
              <Group spacing={6} position="center">
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>
                  {"게시글을 삭제하시겠어요?"}
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

export default CommunityDeleteModal;
