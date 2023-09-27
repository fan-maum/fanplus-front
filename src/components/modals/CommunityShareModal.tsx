import { VoteDetailStars } from '@/types/vote';
import { brandColor } from '@/styles/Colors';
import { formatNumberWithComma, getIndexByVotes } from '@/utils/util';
import { Box, Divider, Modal, ModalProps } from '@mantine/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { isMobile } from 'react-device-detect';
import ShareButtonWithIcon from '../atoms/ShareButtonWithIcon';
import { Stack, Group, UnstyledButton } from '@/components/atoms';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { shareModalState } from '@/store/voteLangState';
import { useRecoilState } from 'recoil';
import { useEndText, useMiddleText, useTitleText } from '@/store/shareContent';
import { useCopiedText } from '@/hooks/useCopyText';
import { PostInfoItemType } from '@/types/community';
import { useRouter } from 'next/router';

export interface CommunityShareModalProps extends ModalProps {
  postTitle: string;
  isWebView?: boolean;
  phoneModel?: string;
  confirmModalOpened: () => void;
}

function CommunityShareModal({
  postTitle,
  isWebView,
  phoneModel,
  confirmModalOpened,
  ...props
}: CommunityShareModalProps) {
  const canShare = isMobile && navigator.share;
  const language = useUrlLanguage();

  const shareModalLanguage = useRecoilState(shareModalState(language))[0];

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
    title: `${shareModalLanguage?.shareModalTitle}`,
    zIndex: 200000,
    ...props,
  };

  const router = useRouter();
  const checkWindow = () => typeof window !== 'undefined';
  const fanplus = language === 'ko' ? '팬플러스' : 'Fanplus';
  const text = `[${fanplus}] ${postTitle}`;
  const url = `${checkWindow() ? window.location.origin : ''}${router.asPath}`;
  const copyText2 = `${text}\r\n${url}`;
  const copyText = copyText2.replace('\\r\\n', '<br>').replace('\\n', '<br>');

  const kakaoOnClick = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    const template = {
      templateId: 98624,
      templateArgs: {
        pathUrl: router.asPath,
        postName: postTitle,
        fanplusLogo: 'https://fanplus.co.kr/wp-content/uploads/2020/04/fanplus_metatag.png',
      },
    };

    if (isWebView) {
      if (phoneModel === 'android') {
        (window as any).Android.kakaoShare(JSON.stringify(template));
      } else if (phoneModel === 'iphone') {
        (window as any).webkit.messageHandlers.kakaoShare.postMessage(JSON.stringify(template));
      }
    } else window.Kakao.Share.sendCustom(template);
  };

  const twitterOnClick = () => {
    const windowPage = window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
        url
      )}`
    );
    if (windowPage) windowPage.focus();
  };

  const shareOnClick = () => {
    props.onClose();
    if (canShare) {
      window.navigator?.share({
        title: text,
        text,
        url,
      });
    } else {
      confirmModalOpened();
    }
  };

  return (
    <>
      <Modal {...modalProps}>
        <Stack>
          <Box px={32} pb={32}>
            <Group style={{ justifyContent: 'space-around' }}>
              {language === 'ko' && (
                <ShareButtonWithIcon
                  buttonId="kakaoShareButton"
                  onClick={kakaoOnClick}
                  src="/icons/icon_Kakao.svg"
                  c={brandColor.kakao}
                  text="카카오톡"
                />
              )}
              <ShareButtonWithIcon
                buttonId="twitterShareButton"
                onClick={twitterOnClick}
                varient="twitter"
                src="/icons/icon_Twitter.svg"
                c={brandColor.twitter}
                text={`${shareModalLanguage?.twitter}`}
              />
              <CopyToClipboard text={copyText}>
                <ShareButtonWithIcon
                  buttonId="urlShareButton"
                  onClick={shareOnClick}
                  src={`/icons/Icon_${canShare ? 'More' : 'Link'}.svg`}
                  c="#819298"
                  text={
                    canShare
                      ? `${shareModalLanguage?.otherAppShare}`
                      : `${shareModalLanguage?.urlShare}`
                  }
                />
              </CopyToClipboard>
            </Group>
          </Box>
          <Divider />
          <UnstyledButton
            fz={17}
            fw={600}
            onClick={props.onClose}
            css={{ padding: '14px 0', color: '#728388' }}
          >
            {shareModalLanguage?.shareModalClose}
          </UnstyledButton>
        </Stack>
      </Modal>
    </>
  );
}

export default CommunityShareModal;
