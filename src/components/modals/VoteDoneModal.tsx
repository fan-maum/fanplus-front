import { useEffect, useState } from 'react';
import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import VoteModalText from '@/components/molecules/VoteModalText';
import { voteModalState } from '@/store/voteLangState';
import { useRecoilState } from 'recoil';
import { GetLanguage } from '@/hooks/useLanguage';
import { Group } from '../atoms';
import useHtmlElement from '@/hooks/useHtmlElement';

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
  const language = GetLanguage();
  const voteModalLang = useRecoilState(voteModalState(language))[0];
  const voteDoneFirstText = voteModalLang({ n: 1, starName: starName }).voteDoneFirst;
  const voteDoneEndText = voteModalLang({ n: quantity }).voteDoneEnd;

  useEffect(() => {
    if (resultQuantity) setQuantity(resultQuantity);
  }, [resultQuantity]);

  const voteDoneModalProps: CommonModalProps = {
    onClose,
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
