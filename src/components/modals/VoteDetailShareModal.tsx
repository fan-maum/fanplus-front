import { useState } from 'react';
import { useRouter } from 'next/router';
import { VoteDetailStars } from '@/types/vote';
import { brandColor } from '@/styles/Colors';
import { FormatShareTime, formatNumberWithComma, getKoreaTime } from '@/utils/util';
import { Box, Divider, Modal, ModalProps } from '@mantine/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { isMobile } from 'react-device-detect';
import ShareButtonWithIcon from '../atoms/ShareButtonWithIcon';
import { Stack, Group, UnstyledButton } from '@/components/atoms';
import CompletedShareModal from './CompletedShareModal';
import { GetLanguage } from '@/hooks/useLanguage';
import { shareModalState } from '@/store/voteLangState';
import { useRecoilState } from 'recoil';

export interface VoteDetailShareModalProps extends ModalProps {
  endDay: Date;
  voteTitle: string;
  stars: (VoteDetailStars | null)[];
  isWebView?: boolean;
  phoneModel?: string;
}

function VoteDetailShareModal({
  endDay,
  voteTitle,
  stars: [prevStar, star, nextStar],
  isWebView,
  phoneModel,
  ...props
}: VoteDetailShareModalProps) {
  const checkWindow = () => typeof window !== 'undefined';
  const router = useRouter();
  const [completedShareModalIsOpen, setCompletedShareModalIsOpen] = useState(false);
  const canShare = isMobile && navigator.share;
  const language = GetLanguage();
  const today = new Date();
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

  const getIndexByVotes = () => {
    if (star?.RANK === '1') return 0;
    else if (star?.RANK === undefined) return 3;
    else if (star?.RANK === '100') return 2;
    else return 1;
  };
  const remainTimeString = FormatShareTime(Math.floor((endDay.getTime() - today.getTime()) / 1000));
  const koreaTime = getKoreaTime();
  const starNameText = star?.STAR_NAME || '스타이름';
  const voteCount = Number(star?.VOTE_CNT);
  const rankText = `${star?.RANK}`;
  const diffPrevText = `${formatNumberWithComma(
    (Number(prevStar?.VOTE_CNT) || 0) - (voteCount || 0)
  )}`;
  const diffNextText = `${formatNumberWithComma(
    (voteCount || 0) - (Number(nextStar?.VOTE_CNT) || 0)
  )}`;

  const modalTitleText = shareModalLanguage?.shareTitleText;
  const modalMiddleText = shareModalLanguage?.shareMiddleText;
  const modalEndText = shareModalLanguage?.shareEndText;

  const titleText = [
    `${voteTitle} ${modalTitleText?.title0}\n(${modalTitleText?.standard.front} ${koreaTime} ${modalTitleText?.standard.back})`,
    `${voteTitle} #${starNameText} ${modalTitleText?.title1}\n(${modalTitleText?.standard.front} ${koreaTime} ${modalTitleText?.standard.back})`,
    `${voteTitle} #${starNameText} ${modalTitleText?.title2}\n(${modalTitleText?.standard.front} ${koreaTime} ${modalTitleText?.standard.back})`,
    `${voteTitle}`,
  ];
  const middleTextStandard = [
    `${modalMiddleText?.first} ${star?.STAR_GROUP_NAME} #${starNameText} 🏆\n${modalMiddleText?.second} ${nextStar?.STAR_NAME}\n\n${modalMiddleText?.voteDiffFront} ${diffNextText}${modalMiddleText?.voteDiffBack} 👀`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${modalMiddleText?.current} ${rankText}${modalMiddleText?.place} 🏆\n\n${modalMiddleText?.voteDiff}${prevStar?.RANK}${modalMiddleText?.place} ${prevStar?.STAR_NAME}${modalMiddleText?.with} ${diffPrevText}${modalMiddleText?.voteDiffBack}\n${modalMiddleText?.voteDiff}${nextStar?.RANK}${modalMiddleText?.place} ${nextStar?.STAR_NAME}${modalMiddleText?.with} ${diffNextText}${modalMiddleText?.voteDiffBack}`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${modalMiddleText?.current} ${rankText}${modalMiddleText?.place} 🏆\n\n${modalMiddleText?.voteDiff}${prevStar?.RANK}${modalMiddleText?.place} ${prevStar?.STAR_NAME}${modalMiddleText?.with} ${diffPrevText}${modalMiddleText?.voteDiffBack}`,
    `${modalMiddleText?.middlePageFront}\n\n${modalMiddleText?.middlePageBack}`,
  ];
  const middleTextMulti = [
    `${modalMiddleText?.first} ${star?.STAR_GROUP_NAME} #${starNameText} 🏆\n${modalMiddleText?.second} ${nextStar?.STAR_NAME}\n\n${modalMiddleText?.voteDiffFront} ${diffNextText}${modalMiddleText?.voteDiffBack} 👀`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${modalMiddleText?.current} ${rankText}${modalMiddleText?.place} 🏆\n\n${diffPrevText}${modalMiddleText?.voteDiffBack} ${modalMiddleText?.lessThan} ${prevStar?.RANK} ${prevStar?.STAR_NAME}\n$${diffNextText}${modalMiddleText?.voteDiffBack} ${modalMiddleText?.moreThan} ${nextStar?.RANK} ${nextStar?.STAR_NAME}`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${modalMiddleText?.current} ${rankText}${modalMiddleText?.place} 🏆\n\n${diffPrevText}${modalMiddleText?.voteDiffBack} ${modalMiddleText?.lessThan} ${prevStar?.RANK} ${prevStar?.STAR_NAME}`,
    `${modalMiddleText?.middlePageFront}\n\n${modalMiddleText?.middlePageBack}`,
  ];
  const standardLanguage = language === 'ko' || language === 'zh-rCN' || language === 'zh-rTW';
  const middleText = standardLanguage ? middleTextStandard : middleTextMulti;
  const endText = [
    `${modalEndText?.endFront} #${starNameText} ${modalEndText?.endBack}`,
    `${modalEndText?.endFront} #${starNameText} ${modalEndText?.endBack}`,
    `${modalEndText?.endFront} #${starNameText} ${modalEndText?.endBack}`,
    `${modalEndText?.endPage}`,
  ];
  const text = `${titleText[getIndexByVotes()]}\n\n${middleText[getIndexByVotes()]}\n\n${
    endText[getIndexByVotes()]
  }`;
  const url = star
    ? `${checkWindow() ? window.location.origin : ''}${router.asPath}&id=${star?.STAR_IDX}`
    : `${checkWindow() ? window.location.origin : ''}${router.asPath}`;
  const copyText = `${text}\n\n${url}`;

  const kakaoOnClick = () => {
    //   if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    //   const defaultStarData = {
    //     starImage: star?.image,
    //     starName: star?.name,
    //     starId: star?.id,
    //   };
    //   const title1 = ['현재 순위', '목표 투표수', '현재 순위', '현재 순위'];
    //   const description1 = [`${rankText}위`, `${goalText}표`, `${rankText}위`, `${rankText}위`];
    //   const title2 = '현재 투표수';
    //   const description2 = `${votesText}표`;
    //   const sumTitle = '목표 달성률';
    //   const sumDescription = `${percent}%`;
    //   const boldTitle = [
    //     `광고 진행까지 ${diffGoalText}표 남았어요`,
    //     `광고 진행까지 ${100 - percent}% 남았어요`,
    //     `🚨2위 ${nextStar?.name}과(와) 단 ${diffNextText}표 차이`,
    //     `🚨${prevStar?.rank}위 ${prevStar?.name}과(와) 단 ${diffPrevText}표 차이`,
    //   ];
    //   const boldDescription = [
    //     `아무리 ${rankText}위여도 ${goalText}표를 넘지 않으면 광고 진행이 어려워요😭`,
    //     `100%를 달성하지 않으면 광고 진행이 어려워요😭`,
    //     `지금 바로 ${starNameText}에게 투표하고 1위 유지하세요💗`,
    //     `지금 바로 ${starNameText}에게 투표하세요💗`,
    //   ];
    //   const template = {
    //     templateId: 91860,
    //     templateArgs: {
    //       ...defaultStarData,
    //       title1: title1[getIndexByVotes()],
    //       description1: description1[getIndexByVotes()],
    //       title2: title2,
    //       description2: description2,
    //       sumTitle: getIndexByVotes() === 1 ? sumTitle : undefined,
    //       sumDescription: getIndexByVotes() === 1 ? sumDescription : undefined,
    //       boldTitle: boldTitle[getIndexByVotes()],
    //       boldDescription: boldDescription[getIndexByVotes()],
    //     },
    //   };
    //   if (isWebView) {
    //     if (phoneModel === 'android') {
    //       (window as any).Android.kakaoShare(JSON.stringify(template));
    //     } else if (phoneModel === 'iphone') {
    //       (window as any).webkit.messageHandlers.kakaoShare.postMessage(JSON.stringify(template));
    //     }
    //   } else window.Kakao.Share.sendCustom(template);
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
      setCompletedShareModalIsOpen(true);
    }
  };

  const completedShareModalProps = {
    onClose: () => setCompletedShareModalIsOpen(false),
    opened: completedShareModalIsOpen,
  };

  return (
    <>
      <Modal {...modalProps}>
        <Stack>
          <Box px={32} pb={32}>
            <Group style={{ justifyContent: 'space-around' }}>
              {language === 'ko' && (
                <ShareButtonWithIcon
                  onClick={kakaoOnClick}
                  src="/icons/icon_Kakao.svg"
                  c={brandColor.kakao}
                  text="카카오톡"
                />
              )}
              <ShareButtonWithIcon
                onClick={twitterOnClick}
                varient="twitter"
                src="/icons/icon_Twitter.svg"
                c={brandColor.twitter}
                text={`${shareModalLanguage?.twitter}`}
              />
              <CopyToClipboard text={copyText}>
                <ShareButtonWithIcon
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
      <CompletedShareModal {...completedShareModalProps} />
    </>
  );
}

export default VoteDetailShareModal;
