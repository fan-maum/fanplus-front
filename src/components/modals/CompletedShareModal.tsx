import { Modal, ModalProps } from '@mantine/core';
import { UnstyledButton } from '../atoms';

export default function CompletedShareModal({ ...props }: ModalProps) {
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
        URL이 복사되었습니다
      </div>
      <UnstyledButton
        fz={17}
        fw={600}
        onClick={props.onClose}
        css={{ float: 'right', color: '#728388', textAlign: 'right' }}
      >
        확인
      </UnstyledButton>
    </Modal>
  );
}
