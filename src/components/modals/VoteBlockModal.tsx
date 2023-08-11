import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import VoteModalText from '../molecules/VoteModalText';
import useHtmlElement from '@/hooks/useHtmlElement';
import { GetLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteModalButtonState, voteModalState } from '@/store/voteLangState';
import { Group } from '../atoms';
import { formatNumberWithComma } from '@/utils/util';
import { useEffect, useState } from 'react';

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
  const language = GetLanguage();
  const voteModalLang = useRecoilState(voteModalState(language))[0];
  const voteModalButton = useRecoilState(voteModalButtonState(language))[0];
  const voteBlockFirstText = voteModalLang({}).voteBlockFirst;
  const voteBlockEndText = voteModalLang({
    moreVoteCount: formatNumberWithComma(moreVoteCount),
  }).voteBlockEnd;

  const voteBlockModalProps: CommonModalProps = {
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
