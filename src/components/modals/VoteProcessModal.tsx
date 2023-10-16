import { useUrlLanguage } from '@/hooks/useLanguage';
import { voteModalButtonState, voteModalState } from '@/store/voteLangState';
import { VoteDetailStars } from '@/types/vote';
import { formatNumberWithComma } from '@/utils/util';
import { useRecoilState } from 'recoil';
import { Group } from '../atoms';
import VoteModalText from '../molecules/VoteModalText';
import CommonModal, { CommonModalProps } from './CommonModal';

export interface VoteProcessModalProps {
  opened: boolean;
  onClose: () => void;
  onVoteButtonClick: () => void;
  freeVoteCount: number;
  star: VoteDetailStars | null;
}

const VoteProcessModal = ({
  opened,
  onClose,
  onVoteButtonClick,
  freeVoteCount,
  star,
  ...props
}: VoteProcessModalProps) => {
  const language = useUrlLanguage();
  const voteModalLang = useRecoilState(voteModalState(language))[0];
  const voteModalButton = useRecoilState(voteModalButtonState(language))[0];
  const text = voteModalLang({
    freeVoteCount: formatNumberWithComma(freeVoteCount),
    starName: star?.STAR_NAME || '스타이름',
  }).voteProcess;

  const voteProcessModalProps: CommonModalProps = {
    buttonId: 'voteProcessModalVoteButton',
    opened,
    onClose,
    cancelButton: { text: voteModalButton?.voteModalCancel, onClick: onClose },
    confirmButton: {
      onClick: onVoteButtonClick,
      text: voteModalButton?.voteModalVote,
    },
  };
  return (
    <CommonModal {...voteProcessModalProps}>
      <VoteModalText
        voteText={
          <>
            <Group spacing={6} position="center">
              <div
                className="voteModalTextWrap"
                css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            </Group>
          </>
        }
      />
    </CommonModal>
  );
};
export default VoteProcessModal;
