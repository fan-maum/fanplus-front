import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Modal, ModalProps } from '@mantine/core';
import CopyToClipboard from 'react-copy-to-clipboard';
// import { isMobile } from 'react-device-detect';
import { Stack, Group, UnstyledButton } from '@/components/atoms';
import ShareButtonWithIcon from '../atoms/ShareButtonWithIcon';
import { brandColor } from '@/styles/Colors';
import CompletedShareModal from './CompletedShareModal';
import { VoteDetailStars } from '@/types/vote';

export interface VoteDetailShareModalProps extends ModalProps {
  star: VoteDetailStars | undefined;
  // isWebView?: boolean;
  // phoneModel?: string;
}

function VoteDetailShareModal({
  star,
  // isWebView,
  // phoneModel,
  ...props
}: VoteDetailShareModalProps) {
  const checkWindow = () => typeof window !== 'undefined';
  const router = useRouter();
  const [completedShareModalIsOpen, setCompletedShareModalIsOpen] = useState(false);
  // const today = new Date();

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

  // const getIndexByVotes = () => {
  //   if ((star?.votes || 0) < goal) {
  //     if ((star?.rank || 0) <= 6) return 0;
  //     else return 1;
  //   }
  //   if (star?.rank === 1) return 2;
  //   return 3;
  // };
  // const remainTimeString = formatShareTime(Math.floor((endDay.getTime() - today.getTime()) / 1000));
  // const starNameText = star?.name || '스타이름';
  // const rankText = `${star?.rank}`;
  // const votesText = `${formatNumberWithComma(star?.votes || 0)}`;
  // const goalText = `${formatNumberWithComma(goal)}`;
  // const diffGoalText = `${formatNumberWithComma(goal - (star?.votes || 0))}`;
  // const diffPrevText = `${formatNumberWithComma((prevStar?.votes || 0) - (star?.votes || 0))}`;
  // const diffNextText = `${formatNumberWithComma((star?.votes || 0) - (nextStar?.votes || 0))}`;
  // const percent = Math.floor(((star?.votes || 0) / goal) * 100);

  const copyUrl = `${checkWindow() ? window.location.origin : ''}${router.asPath}?id=${
    star?.STAR_IDX
  }`;

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
      `https://twitter.com/intent/tweet?text=${star?.STAR_NAME}&url=${copyUrl}`
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
              <CopyToClipboard text={copyUrl}>
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
