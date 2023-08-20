import { Box, Divider, Modal, ModalProps } from '@mantine/core';
import { isMobile } from 'react-device-detect';
import CopyToClipboard from 'react-copy-to-clipboard';
import ShareButtonWithIcon from '../atoms/ShareButtonWithIcon';
import CompletedShareModal, { CompletedShareModalProps } from './CompletedShareModal';
import { Stack, Group, UnstyledButton } from '@/components/atoms';

type textType = {
  text1: string;
  text2: string;
  text3?: string;
  copyUrl: string;
  close: string;
};

type propTypes = {
  texts: textType;
  setBrowserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCompletedShareModal: React.Dispatch<React.SetStateAction<boolean>>;
  nextUrl: string;
  opened: boolean;
};

const OtherBrowserModal = ({
  texts,
  setBrowserModal,
  setCompletedShareModal,
  nextUrl,
  opened,
  ...props
}: propTypes) => {
  const canShare = isMobile && navigator.share;
  const modalProps: ModalProps = {
    size: 328,
    styles: (theme) => ({
      content: {
        borderRadius: 24,
      },
      header: {
        padding: '24px 0 20px 0',
        width: '100%',
      },
      title: {
        color: '#394346',
        width: '100%',
        fontFamily: 'Pretendard',
        fontWeight: 600,
        fontSize: 20,
        textAlign: 'center',
        letterSpacing: -0.15,
      },
      body: {
        padding: 0,
      },
    }),
    withCloseButton: false,
    centered: true,
    trapFocus: false,
    // title: 'URL 복사 모달',
    zIndex: 200000,
    opened: opened,
    onClose: () => setBrowserModal(false),
    ...props,
  };
  const url = 'https://fanplus.co.kr' + nextUrl?.replaceAll(';', '&');
  const shareOnClick = () => {
    if (canShare) {
      window.navigator?.share({ url });
    } else {
      setCompletedShareModal(true);
    }
  };

  return (
    <Modal {...modalProps}>
      <Stack>
        <Box px={32} pb={32}>
          <Stack align="center">
            <div
              css={{
                margin: '30px 0px 10px',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: '400',
                wordBreak: 'keep-all',
                p: { margin: '10px 0px' },
              }}
            >
              <p>{texts.text1}</p>
              <p>
                {texts.text2}
                <br />
                {texts.text3}
              </p>
            </div>
            <CopyToClipboard text={url}>
              <ShareButtonWithIcon
                onClick={shareOnClick}
                src={`/icons/Icon_${canShare ? 'More' : 'Link'}.svg`}
                c="#819298"
                text={texts.copyUrl}
              />
            </CopyToClipboard>
          </Stack>
        </Box>
        <Divider />
        <UnstyledButton
          fz={17}
          fw={600}
          onClick={() => setBrowserModal(false)}
          css={{ padding: '14px 0', color: '#728388' }}
        >
          {texts.close}
        </UnstyledButton>
      </Stack>
    </Modal>
  );
};

export default OtherBrowserModal;
