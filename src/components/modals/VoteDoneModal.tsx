import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import VoteModalText from '@/components/molecules/VoteModalText';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { voteModalButtonState, voteModalState } from '@/store/voteLangState';
import { formatNumberWithComma } from '@/utils/util';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Group } from '../atoms';

export interface VoteDoneModalProps {
  onClose: () => void;
  onWebViewLink?: () => void;
  dailyTicketCount: number;
  moreVoteCount: number;
  isWebView?: boolean;
  starName: string;
}

const VoteDoneModal = ({
  onClose,
  isWebView,
  dailyTicketCount,
  moreVoteCount,
  onWebViewLink,
  starName,
  ...props
}: VoteDoneModalProps) => {
  const [quantity, setQuantity] = useState(0);
  const language = useUrlLanguage();
  const voteModalLang = useRecoilState(voteModalState(language))[0];
  const voteModalButton = useRecoilState(voteModalButtonState(language))[0];
  const voteDoneFirstText = voteModalLang({
    dailyTicketCount: dailyTicketCount.toString(),
    starName: starName,
  }).voteDoneFirst;
  const voteDoneEndText = voteModalLang({
    moreVoteCount: formatNumberWithComma(quantity),
  }).voteDoneEnd;

  useEffect(() => {
    if (moreVoteCount) setQuantity(moreVoteCount);
  }, [moreVoteCount]);

  const voteDoneModalProps: CommonModalProps = {
    buttonId: 'modalAppDownloadButton',
    onClose,
    opened: !!moreVoteCount,
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
      <CommonModal {...voteDoneModalProps}>
        <VoteModalText
          voteText={
            <>
              <Group spacing={6} position="center">
                <div
                  className="voteModalTextWrap"
                  css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}
                  dangerouslySetInnerHTML={{ __html: voteDoneFirstText }}
                ></div>
              </Group>
              <div
                css={{ fontSize: 18, fontWeight: 400 }}
                dangerouslySetInnerHTML={{ __html: voteDoneEndText }}
              ></div>
            </>
          }
        />
      </CommonModal>
    </>
  );
};

export default VoteDoneModal;
