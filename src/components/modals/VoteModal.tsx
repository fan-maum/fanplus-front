import { Modal } from '@mantine/core';

type ModalPosition = 'center' | 'end';

type VoteModalProps = {
  open: boolean;
  onClose: () => void;
  position: ModalPosition;
  mobile?: boolean;
  children?: React.ReactNode;
};

const VoteModal = ({ open, onClose, position, mobile = false, children }: VoteModalProps) => {
  return (
    <Modal
      opened={open}
      closeOnClickOutside={false}
      withCloseButton={false}
      onClose={onClose}
      overlayProps={{ color: 'rgb(0,0,0)', opacity: 0.75, zIndex: 1000 }}
      styles={() => ({
        content: {
          height: mobile ? '100%' : 412,
          backgroundColor: 'transparent',
          maxHeight: '100% !important',
        },
        body: {
          padding: '0px !important',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: mobile ? 'flex-end' : '',
        },
        inner: {
          padding: '0px !important',
          maxWidth: '100vw',
          maxHeight: '100vh',
          alignItems: `${position === 'center' ? 'flex-start' : 'flex-end !important'}`,
          zIndex: 2000,
        },
      })}
      centered={position === 'center'}
    >
      {children}
    </Modal>
  );
};
export default VoteModal;
