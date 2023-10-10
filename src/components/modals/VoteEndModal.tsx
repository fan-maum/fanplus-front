import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import VoteModalText from '@/components/molecules/VoteModalText';
import { voteDetailLangState, voteModalButtonState } from '@/store/voteLangState';
import { useRecoilState } from 'recoil';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { Group } from '../atoms';

export interface VoteEndModalProps {
  opened: boolean;
  onClose: () => void;
}

const VoteEndModal = ({ opened, onClose, ...props }: VoteEndModalProps) => {
  const language = useUrlLanguage();
  const voteEndedText = useRecoilState(voteDetailLangState(language))[0]?.voteEnded;
  const voteModalButton = useRecoilState(voteModalButtonState(language))[0];

  const voteDoneModalProps: CommonModalProps = {
    buttonId: 'VoteEndModal',
    opened: opened,
    onClose,
    confirmButton: {
      onClick: onClose,
      text: voteModalButton?.voteModalConfirm,
      variant: 'secondary',
    },
  };
  return (
    <>
      <CommonModal {...voteDoneModalProps}>
        <VoteModalText
          voteText={
            <Group position="center">
              <div
                className="voteModalTextWrap"
                css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}
              >
                {voteEndedText}
              </div>
            </Group>
          }
        />
      </CommonModal>
    </>
  );
};

export default VoteEndModal;
