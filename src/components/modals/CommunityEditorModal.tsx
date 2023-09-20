import { Flex, Modal, ModalProps } from '@mantine/core';
import { colors } from '@/styles/Colors';
import { CommunityModalButton } from '../atoms/CommunityModalButton';

export interface CommunityEditorCommonModalProps extends ModalProps {
  texts: { main: string; sub?: string };
  confirmButton: { onClick: () => void; text: string };
  cancelButton: { onClick: () => void; text: string };
}

function CommunityEditorCommonModal({
  texts,
  confirmButton,
  cancelButton,
  ...props
}: CommunityEditorCommonModalProps) {
  return (
    <Modal
      withCloseButton={false}
      centered
      returnFocus={false}
      trapFocus={false}
      transitionProps={{ duration: 200 }}
      zIndex={20000}
      size={'auto'}
      {...props}
      styles={() => ({
        content: {
          borderRadius: 20,
          overflow: 'hidden',
          border: '1.5px solid #d9d9d9',
          transitionDuration: '500ms !important',
        },
        body: {
          width: 328,
          fontFamily: 'Pretendard',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 18,
          textAlign: 'center',
          letterSpacing: -0.3,
          paddingLeft: '0 !important',
          padding: '45px 0 0 0 !important',
          color: colors.gray[700],
          p: { margin: '10px' },
        },
      })}
    >
      <div css={{ padding: '0px 10px' }}>
        <p>{texts.main}</p>
        <p css={{ fontSize: '15px', color: colors.gray[600], fontWeight: '400' }}>{texts.sub}</p>
      </div>
      <Flex w="100%" mt={44}>
        <CommunityModalButton css={{ flex: 1 }} onClick={cancelButton.onClick}>
          {cancelButton.text}
        </CommunityModalButton>
        <CommunityModalButton variant="primary" css={{ flex: 1 }} onClick={confirmButton.onClick}>
          {confirmButton.text}
        </CommunityModalButton>
      </Flex>
    </Modal>
  );
}

export default CommunityEditorCommonModal;
