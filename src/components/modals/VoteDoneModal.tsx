import { useEffect, useState } from 'react';
import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import VoteModalText from '@/components/molecules/VoteModalText';

export interface VoteDoneModalProps {
  onClose: () => void;
  onWebViewLink?: () => void;
  resultQuantity: number;
  isWebView?: boolean;
  starName: string;
}

const VoteDoneModal = ({
  onClose,
  isWebView,
  resultQuantity,
  onWebViewLink,
  starName,
  ...props
}: VoteDoneModalProps) => {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    if (resultQuantity) setQuantity(resultQuantity);
  }, [resultQuantity]);

  const voteDoneModalProps: CommonModalProps = {
    onClose,
    overridestyle: {
      title: {
        marginTop: -82,
      },
      header: {
        margin: 0,
        height: 16,
      },
    },
    opened: !!resultQuantity,
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
  return (
    <>
      <CommonModal {...voteDoneModalProps}>
        <VoteModalText
          starName={starName}
          voteText={
            <>
              <span css={{ fontWeight: 700 }}>무료로 1표</span>가 투표가 되었어요.
              <br />
              <span css={{ fontWeight: 700 }}>팬마음 앱에서 {quantity}표</span> 더 투표해보세요!
            </>
          }
        />
      </CommonModal>
    </>
  );
};

export default VoteDoneModal;
