import { CSSObject, Flex, Modal, ModalProps } from '@mantine/core';
import { colors } from '@/styles/Colors';
import { VoteModalButton } from '../atoms/VoteModalButton';
import { CommunityModalButton } from '../atoms/CommunityModalButton';

export interface CommunityReportCommonModalProps extends ModalProps {
  buttonId?: string;
  confirmButton?: { onClick?: () => void; text?: string; loading?: boolean };
  cancelButton?: { onClick?: () => void; text?: string } | boolean;
  withCancelButton?: boolean;
  overridestyle?: { header?: CSSObject; title?: CSSObject };
}

function CommunityReportCommonModal({
  buttonId,
  confirmButton,
  cancelButton,
  withCancelButton,
  children,
  ...props
}: CommunityReportCommonModalProps) {
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
        header: {
          marginBottom: '30px',
          padding: '20px 0 0 0 !important',
        },
        close: {
          '& > svg': { width: '100% !important', height: '100% !important' },
          width: '24px',
          height: '24px',
          color: '#000',
        },
        title: {
          color: '#101010',
          fontWeight: 600,
          fontSize: 28,
        },
        content: {
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid #D9D9D9',
          padding: 25,
        },
        body: {
          minWidth: 280,
          fontFamily: 'Pretendard',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 18,
          textAlign: 'center',
          letterSpacing: -0.3,
          paddingLeft: '0 !important',
          padding: '0 !important',
          color: colors.gray[props?.title ? 700 : 750],
        },
      })}
    >
      {children}
      <Flex w="100%" mt={44}>
        {(cancelButton || withCancelButton) && (
          <CommunityModalButton
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
          </CommunityModalButton>
        )}
        <CommunityModalButton
          buttonId={buttonId}
          variant="report"
          css={{ flex: 1 }}
          onClick={confirmButton?.onClick}
        >
          {confirmButton?.text || '확인'}
        </CommunityModalButton>
      </Flex>
    </Modal>
  );
}

export default CommunityReportCommonModal;
