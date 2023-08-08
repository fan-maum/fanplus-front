import { VoteDetailStars } from '@/types/vote';
import VoteModalText from '../molecules/VoteModalText';
import CommonModal, { CommonModalProps } from './CommonModal';

export interface VoteProcessModalProps {
  opened: boolean;
  onClose: () => void;
  onVoteButtonClick: () => void;
  star: VoteDetailStars | null;
}

const VoteProcessModal = ({
  opened,
  onClose,
  onVoteButtonClick,
  star,
  ...props
}: VoteProcessModalProps) => {
  const voteProcessModalProps: CommonModalProps = {
    opened,
    onClose,
    cancelButton: { text: '취소하기', onClick: onClose },
    confirmButton: {
      onClick: onVoteButtonClick,
      text: '투표하기',
    },
  };
  return (
    <CommonModal {...voteProcessModalProps}>
      <VoteModalText
        starName={star?.STAR_NAME || '스타이름'}
        voteText={
          <>
            <span css={{ fontWeight: 700 }}>무료로 1표</span> 투표하시겠어요?
          </>
        }
      />
    </CommonModal>
  );
};
export default VoteProcessModal;
