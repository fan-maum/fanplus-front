import { Modal, ModalProps } from '@mantine/core';
import { UnstyledButton } from '../atoms';
import { useRecoilState } from 'recoil';
import { shareModalState } from '@/store/voteLangState';
import { useUrlLanguage } from '@/hooks/useLanguage';

export interface CompletedShareModalProps extends ModalProps {}

export default function CompletedShareModal({ ...props }: CompletedShareModalProps) {
  const language = useUrlLanguage();
  const shareModalLanguage = useRecoilState(shareModalState(language))[0];
  const modalProps: ModalProps = {
    size: 328,
    styles: (theme) => ({
      content: {
        padding: '32px 32px 32px 24px',
        borderRadius: 24,
      },
      body: {
        padding: 0,
        color: '#394346',
      },
    }),
    withCloseButton: false,
    centered: true,
    trapFocus: false,
    zIndex: 200000,
    ...props,
  };
  return (
    <Modal {...modalProps}>
      <div
        css={{
          fontSize: 17,
          fontWeight: 400,
          marginBottom: 16,
        }}
      >
        {shareModalLanguage?.urlCopied}
      </div>
      <UnstyledButton
        fz={17}
        fw={600}
        onClick={props.onClose}
        css={{ float: 'right', color: '#728388', textAlign: 'right' }}
      >
        {shareModalLanguage?.check}
      </UnstyledButton>
    </Modal>
  );
}
