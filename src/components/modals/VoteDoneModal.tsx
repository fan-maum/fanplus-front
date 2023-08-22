import { useEffect, useState } from 'react';
import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import VoteModalText from '@/components/molecules/VoteModalText';
import { voteModalButtonState, voteModalState } from '@/store/voteLangState';
import { useRecoilState } from 'recoil';
import { GetLanguage } from '@/hooks/useLanguage';
import { Group } from '../atoms';
import useHtmlElement from '@/hooks/useHtmlElement';
import { formatNumberWithComma } from '@/utils/util';

export interface VoteDoneModalProps {
  onClose: () => void;
  onWebViewLink?: () => void;
  freeVoteCount: number;
  moreVoteCount: number;
  isWebView?: boolean;
  starName: string;
}

const VoteDoneModal = ({
  onClose,
  isWebView,
  freeVoteCount,
  moreVoteCount,
  onWebViewLink,
  starName,
  ...props
}: VoteDoneModalProps) => {
  const [quantity, setQuantity] = useState(0);
  const language = GetLanguage();
  const voteModalLang = useRecoilState(voteModalState(language))[0];
  const voteModalButton = useRecoilState(voteModalButtonState(language))[0];
  const voteDoneFirstText = voteModalLang({
    freeVoteCount: freeVoteCount,
    starName: starName,
  }).voteDoneFirst;
  const voteDoneEndText = voteModalLang({
    moreVoteCount: formatNumberWithComma(quantity),
  }).voteDoneEnd;

  useEffect(() => {
    if (moreVoteCount) setQuantity(moreVoteCount);
  }, [moreVoteCount]);

  const voteDoneModalProps: CommonModalProps = {
    buttonId: 'appDownloadButton',
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
                  dangerouslySetInnerHTML={useHtmlElement(voteDoneFirstText)}
                ></div>
              </Group>
              <div
                css={{ fontSize: 18, fontWeight: 400 }}
                dangerouslySetInnerHTML={useHtmlElement(voteDoneEndText)}
              ></div>
            </>
          }
        />
      </CommonModal>
    </>
  );
};

export default VoteDoneModal;
