import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';

export interface VoteBlockModalProps {
  opened: boolean;
  onWebViewLink?: () => void;
  onClose: () => void;
  isWebView?: boolean;
}

function VoteBlockModal({
  onClose,
  onWebViewLink,
  opened,
  isWebView,
  ...props
}: VoteBlockModalProps) {
  const voteBlockModalProps: CommonModalProps = {
    opened,
    onClose,
    cancelButton: { text: '완료', onClick: onClose },
    confirmButton: {
      onClick: () => {
        if (!isWebView && onWebViewLink) {
          onWebViewLink();
        } else {
          onClose();
        }
      },
      text: '앱 설치하기',
    },
  };
  const freeVotes = 3;

  return (
    <>
      <CommonModal {...voteBlockModalProps}>
        <div
          css={{
            lineHeight: '26px',
            fontSize: 18,
            fontWeight: 400,
            color: '#475357',
          }}
        >
          하루에 한 번 투표에 참여할 수 있어요.
          <br />
          팬 플러스 앱 설치하면
          <br />
          <span css={{ fontWeight: 700 }}>매일 {freeVotes}표</span>를 드리고 있어요.
        </div>
      </CommonModal>
    </>
  );
}

export default VoteBlockModal;
