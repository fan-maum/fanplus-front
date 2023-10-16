import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { voteModalButtonState, voteModalState } from '@/store/voteLangState';
import { formatNumberWithComma } from '@/utils/util';
import { useRecoilState } from 'recoil';
import { Group } from '../atoms';
import VoteModalText from '../molecules/VoteModalText';

export interface VoteBlockModalProps {
  opened: boolean;
  onWebViewLink?: () => void;
  onClose: () => void;
  moreVoteCount: number;
  isWebView?: boolean;
}

function VoteBlockModal({
  onClose,
  onWebViewLink,
  opened,
  moreVoteCount,
  isWebView,
  ...props
}: VoteBlockModalProps) {
  const language = useUrlLanguage();
  const voteModalLang = useRecoilState(voteModalState(language))[0];
  const voteModalButton = useRecoilState(voteModalButtonState(language))[0];
  const voteBlockFirstText = voteModalLang({}).voteBlockFirst;
  const voteBlockEndText = voteModalLang({
    moreVoteCount: formatNumberWithComma(moreVoteCount),
  }).voteBlockEnd;

  const voteBlockModalProps: CommonModalProps = {
    buttonId: 'modalAppDownloadButton',
    opened,
    onClose,
    cancelButton: { text: voteModalButton?.voteModalComplete, onClick: onClose },
    confirmButton: {
      onClick: () => {
        if (!isWebView && onWebViewLink) {
          onWebViewLink();
        } else {
          onClose();
        }
      },
      text: voteModalButton?.voteModalInstall,
    },
  };

  return (
    <>
      <CommonModal {...voteBlockModalProps}>
        <VoteModalText
          voteText={
            <>
              <Group spacing={6} position="center">
                <div
                  css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}
                  dangerouslySetInnerHTML={{ __html: voteBlockFirstText }}
                ></div>
              </Group>
              <div
                css={{ fontSize: 18, fontWeight: 400 }}
                dangerouslySetInnerHTML={{ __html: voteBlockEndText }}
              ></div>
            </>
          }
        />
      </CommonModal>
    </>
  );
}

export default VoteBlockModal;
