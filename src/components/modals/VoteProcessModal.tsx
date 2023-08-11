import { VoteDetailStars } from '@/types/vote';
import VoteModalText from '../molecules/VoteModalText';
import CommonModal, { CommonModalProps } from './CommonModal';
import { Group } from '../atoms';
import { GetLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteModalState } from '@/store/voteLangState';
import useHtmlElement from '@/hooks/useHtmlElement';

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
  const language = GetLanguage();
  const voteModalLang = useRecoilState(voteModalState(language))[0];
  const text = voteModalLang({ n: 1, starName: star?.STAR_NAME || '스타이름' }).voteProcess;

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
        voteText={
          <>
            <Group spacing={6} position="center">
              <div
                className="voteModalTextWrap"
                css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}
                dangerouslySetInnerHTML={useHtmlElement(text)}
              ></div>
            </Group>
          </>
        }
      />
    </CommonModal>
  );
};
export default VoteProcessModal;
