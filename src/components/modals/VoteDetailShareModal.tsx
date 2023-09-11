import { VoteDetailStars } from '@/types/vote';
import { brandColor } from '@/styles/Colors';
import { formatNumberWithComma, getIndexByVotes } from '@/utils/util';
import { Box, Divider, Modal, ModalProps } from '@mantine/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { isMobile } from 'react-device-detect';
import ShareButtonWithIcon from '../atoms/ShareButtonWithIcon';
import { Stack, Group, UnstyledButton } from '@/components/atoms';
import { useUrlLanguage, GetRouterLanguage } from '@/hooks/useLanguage';
import { shareModalState } from '@/store/voteLangState';
import { useRecoilState } from 'recoil';
import { useEndText, useMiddleText, useTitleText } from '@/store/shareContent';
import { useCopiedText } from '@/hooks/useCopyText';

export interface VoteDetailShareModalProps extends ModalProps {
  endDay: Date;
  voteTitle: string;
  stars: (VoteDetailStars | null)[];
  isWebView?: boolean;
  phoneModel?: string;
  confirmModalOpened: () => void;
}

function VoteDetailShareModal({
  endDay,
  voteTitle,
  stars: [prevStar, star, nextStar],
  isWebView,
  phoneModel,
  confirmModalOpened,
  ...props
}: VoteDetailShareModalProps) {
  const canShare = isMobile && navigator.share;
  const language = useUrlLanguage();
  const routerLanguage = GetRouterLanguage();
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

  const starNameText = star?.STAR_NAME || '스타이름';
  const voteCount = formatNumberWithComma(Number(star?.VOTE_CNT));
  const rankText = `${star?.RANK}`;
  const diffPrevText = `${formatNumberWithComma(
    (Number(prevStar?.VOTE_CNT) || 0) - (Number(star?.VOTE_CNT) || 0)
  )}`;
  const diffNextText = `${formatNumberWithComma(
    (Number(star?.VOTE_CNT) || 0) - (Number(nextStar?.VOTE_CNT) || 0)
  )}`;
  const titleText = useTitleText(voteTitle, starNameText);
  const middleText = useMiddleText(
    star,
    nextStar,
    prevStar,
    starNameText,
    diffNextText,
    rankText,
    diffPrevText
  );
  const endText = useEndText(starNameText);
  const { text, url } = useCopiedText(star, titleText, middleText, endText);
  const copyText2 = `${text}\r\n${url}`;
  const copyText = copyText2.replace('\\r\\n', '<br>').replace('\\n', '<br>');

  const kakaoOnClick = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);

    const defaultStarData = {
      starImage: star?.PROFILE_IMG,
      starName: star?.STAR_NAME,
      starId: star?.STAR_IDX,
    };

    const title1 = ['현재 순위', '현재 순위', '현재 순위', ''];
    const description1 = [`${rankText}위`, `${rankText}위`, `${rankText}위`, ''];
    const title2 = '현재 투표수';
    const description2 = `${voteCount}표`;
    const boldTitle = [
      `🚨2위 ${nextStar?.STAR_NAME}과(와) 단 ${diffNextText}표 차이`,
      `🚨${prevStar?.RANK}위 ${prevStar?.STAR_NAME}과(와) 단 ${diffPrevText}표 차이`,
      `🚨${prevStar?.RANK}위 ${prevStar?.STAR_NAME}과(와) 단 ${diffPrevText}표 차이`,
      `🚨${prevStar?.RANK}위 ${prevStar?.STAR_NAME}과(와) 단 ${diffPrevText}표 차이`,
    ];
    const boldDescription = [
      `지금 바로 ${starNameText}에게 투표하고 1위 유지하세요💗`,
      `지금 바로 ${starNameText}에게 투표하세요💗`,
      `지금 바로 ${starNameText}에게 투표하세요💗`,
      ``,
    ];
    const template = {
      templateId: 96769,
      templateArgs: {
        ...defaultStarData,
        title1: title1[getIndexByVotes(star)],
        description1: description1[getIndexByVotes(star)],
        title2: title2,
        description2: description2,
        boldTitle: boldTitle[getIndexByVotes(star)],
        boldDescription: boldDescription[getIndexByVotes(star)],
        vote_IDX: `${star?.VOTE_IDX}`,
        language: `${language}`,
        lang: `${routerLanguage}`,
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
        title: '팬플러스 투표 공유',
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

export default VoteDetailShareModal;
