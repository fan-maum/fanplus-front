import { CSSObject, Flex, Modal, ModalProps } from '@mantine/core';
import { colors } from '@/styles/Colors';
import { VoteModalButton } from '../atoms/VoteModalButton';

export interface CommonModalProps extends ModalProps {
  buttonId?: string;
  confirmButton?: { onClick?: () => void; text?: string; loading?: boolean };
  cancelButton?: { onClick?: () => void; text?: string } | boolean;
  withCancelButton?: boolean;
  overridestyle?: { header?: CSSObject; title?: CSSObject };
}

function CommonModal({
  buttonId,
  confirmButton,
  cancelButton,
  withCancelButton,
  children,
  ...props
}: CommonModalProps) {
  return (
    <Modal
      withCloseButton={false}
      centered
      returnFocus={false}
      trapFocus={false}
      transitionProps={{ duration: 200 }}
      zIndex={200000}
      size={'auto'}
      {...props}
      styles={(theme) => ({
        content: {
          borderRadius: 24,
          overflow: 'hidden',
        },
        body: {
          minWidth: 328,
          fontFamily: 'Pretendard',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 18,
          textAlign: 'center',
          letterSpacing: -0.3,
          padding: '42px 20px 30px 20px !important',
          color: colors.gray[props?.title ? 700 : 750],
        },
      })}
    >
      {children}
      <Flex gap={10} w="100%" mt={28}>
        {(cancelButton || withCancelButton) && (
          <VoteModalButton
            css={{ flex: 1 }}
            onClick={
              (typeof cancelButton === 'object' &&
                (() => {
                  cancelButton.onClick && cancelButton.onClick();
                  props.onClose();
                })) ||
              props.onClose
            }
          >
            {(typeof cancelButton === 'object' && cancelButton?.text) || '취소'}
          </VoteModalButton>
        )}
        <VoteModalButton
          buttonId={buttonId}
          variant="primary"
          css={{ flex: 1 }}
          onClick={confirmButton?.onClick}
        >
          {confirmButton?.text || '확인'}
        </VoteModalButton>
      </Flex>
    </Modal>
  );
}

export default CommonModal;
