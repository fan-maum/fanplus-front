import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Modal, ModalProps } from '@mantine/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Stack, Group, UnstyledButton } from '@/components/atoms';
import ShareButtonWithIcon from '../atoms/ShareButtonWithIcon';
import { brandColor } from '@/styles/Colors';
import CompletedShareModal from './CompletedShareModal';
import { VoteDetailStars } from '@/types/vote';
import { FormatShareTime, formatNumberWithComma } from '@/utils/util';

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
  const today = new Date();

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
    title: '공유하기',
    zIndex: 200000,
    ...props,
  };

  const getIndexByVotes = () => {
    if (star?.RANK === '1') return 0;
    else if (star?.RANK === null) return 3;
    else if (star?.RANK === '100') return 2;
    else return 1;
  };
  const remainTimeString = FormatShareTime(Math.floor((endDay.getTime() - today.getTime()) / 1000));
  const starNameText = star?.STAR_NAME || '스타이름';
  const voteCount = Number(star?.VOTE_CNT);
  const rankText = `${star?.RANK}`;
  const diffPrevText = `${formatNumberWithComma(
    (Number(prevStar?.VOTE_CNT) || 0) - (voteCount || 0)
  )}`;
  const diffNextText = `${formatNumberWithComma(
    (voteCount || 0) - (Number(nextStar?.VOTE_CNT) || 0)
  )}`;

  const titleText = [
    `${voteTitle} 현재 순위는⁉`,
    `${voteTitle} #${starNameText} 순위는⁉`,
    `${voteTitle} #${starNameText} 순위는⁉`,
    `${voteTitle}`,
  ];
  const middleText = [
    `1위 ${star?.STAR_GROUP_NAME} #${starNameText} 🏆\n2위 ${nextStar?.STAR_NAME}\n\n단 ${diffNextText}표 차이 👀`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${rankText}위 🏆\n\n${prevStar?.RANK}위 ${prevStar?.STAR_NAME}와(과) ${diffPrevText}표 차이\n${nextStar?.RANK}위 ${nextStar?.STAR_NAME}와(과) ${diffNextText}표 차이`,
    `${star?.STAR_GROUP_NAME} #${starNameText} ${rankText}위 🏆\n\n${prevStar?.RANK}위 ${prevStar?.STAR_NAME}와(과) ${diffPrevText}표 차이`,
    `#팬플러스 투표 참여하고\n최애만을 위한 특별한 광고 선물하자 🎁🎈\n\n현재 1위 : ❓`,
  ];
  const endText = [
    `지금 바로 #팬플러스 에서 #${starNameText} 에게 투표하세요 ✊🏻✊🏻`,
    `지금 바로 #팬플러스 에서 #${starNameText} 에게 투표하세요 ✊🏻✊🏻`,
    `지금 바로 #팬플러스 에서 #${starNameText} 에게 투표하세요 ✊🏻✊🏻`,
    `🔻실시간 순위 확인하러 가기🔻`,
  ];
  const text = `${titleText[getIndexByVotes()]}\n\n${middleText[getIndexByVotes()]}\n\n${
    endText[getIndexByVotes()]
  }`;
  const url = `${checkWindow() ? window.location.origin : ''}${router.asPath}?id=${star?.STAR_IDX}`;
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
    setCompletedShareModalIsOpen(true);
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
            <Group position="apart">
              <ShareButtonWithIcon
                onClick={kakaoOnClick}
                src="/icons/icon_Kakao.svg"
                c={brandColor.kakao}
                text="카카오톡"
              />
              <ShareButtonWithIcon
                onClick={twitterOnClick}
                src="/icons/icon_Twitter.svg"
                c={brandColor.twitter}
                text="트위터"
              />
              <CopyToClipboard text={copyText}>
                <ShareButtonWithIcon
                  onClick={shareOnClick}
                  src={`/icons/Icon_Link.svg`}
                  c="#819298"
                  text="URL 복사"
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
            닫기
          </UnstyledButton>
        </Stack>
      </Modal>
      <CompletedShareModal {...completedShareModalProps} />
    </>
  );
}

export default VoteDetailShareModal;
