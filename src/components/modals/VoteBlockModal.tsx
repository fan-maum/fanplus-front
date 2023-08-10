import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import VoteModalText from '../molecules/VoteModalText';
import useHtmlElement from '@/hooks/useHtmlElement';
import { GetLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteModalState } from '@/store/voteLangState';
import { Group } from '../atoms';
import { formatNumberWithComma } from '@/utils/util';
import { useEffect, useState } from 'react';

export interface VoteBlockModalProps {
  opened: boolean;
  onWebViewLink?: () => void;
  onClose: () => void;
  resultQuantity: number;
  isWebView?: boolean;
}

function VoteBlockModal({
  onClose,
  onWebViewLink,
  opened,
  resultQuantity,
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
  const [quantity, setQuantity] = useState(0);
  const language = GetLanguage();
  const voteModalLang = useRecoilState(voteModalState(language))[0];
  const voteBlockFirstText = voteModalLang({}).voteBlockFirst;
  const voteBlockEndText = voteModalLang({ N: formatNumberWithComma(quantity) }).voteBlockEnd;

  useEffect(() => {
    if (resultQuantity) setQuantity(resultQuantity);
  }, [resultQuantity]);

  return (
    <>
      <CommonModal {...voteBlockModalProps}>
        <VoteModalText
          voteText={
            <>
              <Group spacing={6} position="center">
                <div
                  css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}
                  dangerouslySetInnerHTML={useHtmlElement(voteBlockFirstText)}
                ></div>
              </Group>
              <div
                css={{ fontSize: 18, fontWeight: 400 }}
                dangerouslySetInnerHTML={useHtmlElement(voteBlockEndText)}
              ></div>
            </>
          }
        />
      </CommonModal>
    </>
  );
}

export default VoteBlockModal;
