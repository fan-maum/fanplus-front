import VoteDetailTemplate from './VoteDetailTemplate';
import VoteDetailHeader, {
  VoteDetailHeaderProps,
} from '@/components/organisms/voteDetail/VoteDetailHeader';
import VoteDetailInfo, {
  VoteDetailInfoProps,
} from '@/components/organisms/voteDetail/VoteDetailInfo';
import VoteDetailPrizeList, {
  VoteDetailPrizeListProps,
  prizeTabContentsProps,
} from '@/components/organisms/voteDetail/VoteDetailPrizeList';
import VoteDetailList, {
  VoteDetailListProps,
} from '@/components/organisms/voteDetail/VoteDetailList';
import { VoteDetailResponse, VoteDetailStars, VoteMutateParam } from '@/types/vote';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';
import { useEffect, useState } from 'react';
import VoteDetailShareModal, {
  VoteDetailShareModalProps,
} from '@/components/modals/VoteDetailShareModal';
import { useRouter } from 'next/router';
import CompletedShareModal, { CompletedShareModalProps } from '../modals/CompletedShareModal';
import VoteProcessModal from '../modals/VoteProcessModal';
import VoteDoneModal from '../modals/VoteDoneModal';
import VoteBlockModal from '../modals/VoteBlockModal';
import { useMutation } from 'react-query';
import { postVotes } from '@/api/Vote';
import VoteEndModal from '../modals/VoteEndModal';
import { AxiosError } from 'axios';
import { pathOnly } from '@/utils/util';
import VoteDetailImagePopup from '../modals/VoteDetailImagePopup';
import { getVoteCookie, setVoteCookie } from '@/utils/communityCookie';
import dayjs from 'dayjs';

export interface VotesLayoutProps {
  voteDetails: VoteDetailResponse;
  dailyTicketCount: number;
  headers: [];
  authCookie: string | null;
  isWebView?: boolean;
  error: number | boolean;
}

export const findStarById: (id: string, voteDetails: VoteDetailResponse) => any = (
  id,
  voteDetails
) => voteDetails.RESULTS.DATAS.VOTE_INFO.STARS?.filter((item) => item.STAR_IDX === id) || undefined;

export const findStarIndexById: (
  id: string,
  voteDetails: VoteDetailResponse
) => { index: number } | undefined = (id, voteDetails) => {
  const index = voteDetails.RESULTS.DATAS.VOTE_INFO.STARS.findIndex((item) => item.STAR_IDX === id);
  return index !== -1 ? { index: index } : undefined;
};

const VoteDetailLayout = ({
  voteDetails: propsVoteDetails,
  dailyTicketCount,
  headers,
  authCookie,
  isWebView,
  error,
}: VotesLayoutProps) => {
  const endDay = new Date(propsVoteDetails.RESULTS.DATAS.VOTE_INFO.END_DATE);
  const router = useRouter();
  const language = useUrlLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  const [shareModalIsOpened, setShareModalIsOpened] = useState(false);
  const [completedShareModalIsOpen, setCompletedShareModalIsOpen] = useState(false);
  const [stars, setStars] = useState<(VoteDetailStars | null)[]>([null, null, null]);
  const [voteDetails, setVoteDetails] = useState(propsVoteDetails);

  const [voteModalBlock, setVoteModalBlock] = useState(false);
  const [voteModal, setVoteModal] = useState(false);
  const [voteModalDone, setVoteModalDone] = useState(0);
  const [voteModalEnd, setVoteModalEnd] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);

  const moreVoteCount = 1650;
  const webViewLink = `https://p7m9w.app.goo.gl/?link=${encodeURIComponent(
    `https://vote.fanplus.co.kr/?vote=${router.query.vote_IDX}&photocard_type=share_vote&vote_idx=${router.query.vote_IDX}`
  )}&apn=com.photocard.allstar&amv=100&ibi=com.photocard.master&isi=1448805815&ofl=${encodeURIComponent(
    `https://fanplus.co.kr/ko/voteDetail/?vote_IDX=${router.query.vote_IDX}&lang=${router.query.lang}&id=${router.query.id}`
  )}`;

  const prizeTabContents: prizeTabContentsProps = {
    prizeTabContentsItem: [
      {
        id: 'prizeTab_01',
        titleImage: '/icons/icon_explanation.png',
        title: voteDetailLanguage?.prizeTitle.detail,
        isRequired: true,
        contents: {
          DESCRIPTION: voteDetails.RESULTS.DATAS.VOTE_INFO.DESCRIPTION,
        },
      },
      {
        id: 'prizeTab_02',
        titleImage: '/icons/icon_medal1.png',
        title: voteDetailLanguage?.prizeTitle.first,
        isRequired: true,
        contents: {
          PRIZE_IMG: voteDetails.RESULTS.DATAS.VOTE_INFO.FIRST_PRIZE_IMG,
          PRIZE_TITLE: voteDetails.RESULTS.DATAS.VOTE_INFO.FIRST_PRIZE_TITLE,
          PRIZE_DESCRIPTION: voteDetails.RESULTS.DATAS.VOTE_INFO.FIRST_PRIZE_DESCRIPTION,
        },
      },
      {
        id: 'prizeTab_03',
        titleImage: '/icons/icon_medal2.png',
        title: voteDetailLanguage?.prizeTitle.second,
        isRequired: true,
        contents: {
          PRIZE_IMG: voteDetails.RESULTS.DATAS.VOTE_INFO.SECOND_PRIZE_IMG,
          PRIZE_TITLE: voteDetails.RESULTS.DATAS.VOTE_INFO.SECOND_PRIZE_TITLE,
          PRIZE_DESCRIPTION: voteDetails.RESULTS.DATAS.VOTE_INFO.SECOND_PRIZE_DESCRIPTION,
        },
      },
      {
        id: 'prizeTab_04',
        titleImage: '/icons/icon_medal3.png',
        title: voteDetailLanguage?.prizeTitle.third,
        isRequired: false,
        contents: {
          PRIZE_IMG: voteDetails.RESULTS.DATAS.VOTE_INFO.THIRD_PRIZE_IMG,
          PRIZE_TITLE: voteDetails.RESULTS.DATAS.VOTE_INFO.THIRD_PRIZE_TITLE,
          PRIZE_DESCRIPTION: voteDetails.RESULTS.DATAS.VOTE_INFO.THIRD_PRIZE_DESCRIPTION,
        },
      },
    ],
  };

  const voteDetailPrizeListProps: VoteDetailPrizeListProps = {
    prizeTabContents: prizeTabContents,
    voteDetailInfo: voteDetails.RESULTS.DATAS.VOTE_INFO,
  };

  const setStarWithIndex = (index: number) => {
    setStars([
      voteDetails.RESULTS.DATAS.VOTE_INFO.STARS[index - 1] || null,
      voteDetails.RESULTS.DATAS.VOTE_INFO.STARS[index] || null,
      voteDetails.RESULTS.DATAS.VOTE_INFO.STARS[index + 1] || null,
    ]);
  };

  const setNextQueryWithId = (starId: string) => {
    const query = Object.assign({ ...router.query }, { id: starId });
    let nextQuery = '?';
    for (const key in query) nextQuery += key + '=' + query[key] + ';';
    return nextQuery.slice(0, nextQuery.length - 1);
  };

  // setting 하는 Data가 다를 것..
  async function handleRefresh() {
    // const voteIndex = router.query['vote_IDX'] as string;
    const id = router.query['id'] as string;
    const optimisticResponse: VoteDetailResponse = {
      ...voteDetails,
      RESULTS: {
        ...voteDetails.RESULTS,
        DATAS: {
          ...voteDetails.RESULTS.DATAS,
          VOTE_INFO: {
            ...voteDetails.RESULTS.DATAS.VOTE_INFO,
            STARS: voteDetails.RESULTS.DATAS.VOTE_INFO.STARS.map((star) => {
              if (star.STAR_IDX === id) {
                return {
                  ...star,
                  VOTE_CNT: (Number(star.VOTE_CNT) + dailyTicketCount).toString(),
                };
              }
              return star;
            }),
          },
        },
      },
    };
    // const res = await getVoteDetail(voteIndex, voteLanguage);
    // if (Object.keys(res.data).length) {
    setVoteDetails(optimisticResponse);
    // }
  }

  const voteMutate = useMutation(
    'vote-mutate',
    async (param: VoteMutateParam) => postVotes(param),
    {
      onSuccess: async (data) => {
        setVoteModal(false);
        if (data.RESULTS.MSG === '투표 완료') {
          await handleRefresh();
          setVoteModalDone(moreVoteCount); // TODO: 여기도 (n 표 더 투표하시겠습니까? (앱링크로))
        } else {
          setVoteModalBlock(true);
        }
      },
      onError: (error: AxiosError) => {
        const responseData: any = error.response?.data;
        if (responseData?.RESULTS.ERROR === 4) {
          setVoteModalEnd(true);
        }
      },
    }
  );

  useEffect(() => {
    setVoteDetails(propsVoteDetails);
  }, [propsVoteDetails]);

  useEffect(() => {
    if (stars[1]) {
      const starData = findStarIndexById(stars[1].STAR_IDX, voteDetails);
      if (starData) setStarWithIndex(starData?.index);
    }
  }, [voteDetails]);

  useEffect(() => {
    const starId = String(router.query.id);
    if (starId && authCookie && findStarById(starId, voteDetails)) {
      const star = findStarIndexById(starId, voteDetails);
      if (star) {
        setStarWithIndex(star.index);
        setVoteModal(true);
      }
    }
  }, []);

  const shareOnClick = (id: string) => {
    const stars = voteDetails.RESULTS.DATAS.VOTE_INFO.STARS;
    const starIndex = stars.findIndex((star) => star.STAR_IDX === id);
    setStarWithIndex(starIndex);
    setShareModalIsOpened(true);
  };

  const communityOnClick = (boardIndex: string | null) => {
    if (boardIndex !== null) {
      router.push(`/${language}/community/board/${boardIndex}/`);
    }
  };

  const voteOnClick = async (id: string) => {
    if (voteDetails.RESULTS.DATAS.VOTE_INFO.STATUS === 'E') {
      setVoteModalEnd(true);
      return;
    }
    const stars = voteDetails.RESULTS.DATAS.VOTE_INFO.STARS;
    const starIndex = stars.findIndex((star) => star.STAR_IDX === id);
    setStarWithIndex(starIndex);
    const newId = voteDetails.RESULTS.DATAS.VOTE_INFO.STARS[starIndex].STAR_IDX;
    await router.push({ query: { ...router.query, id: newId } }, undefined, {
      shallow: true,
    });
    if (authCookie) {
      setVoteModal(true); // * 테스트 => 투표하시겠습니까? 모달
    } else {
      const nextPath = pathOnly(router.asPath);
      const nextQuery = setNextQueryWithId(id);
      router.push({ pathname: '/login', query: { nextUrl: nextPath + nextQuery } });
    }
  };

  const voteDetailHeaderProps: VoteDetailHeaderProps = {
    voteTitle: voteDetails.RESULTS.DATAS.VOTE_INFO.TITLE,
    confirmModalOpened: () => setCompletedShareModalIsOpen(true),
  };

  const voteDetailInfoProps: VoteDetailInfoProps = {
    voteDetailInfo: voteDetails.RESULTS.DATAS.VOTE_INFO,
    dailyTicketCount: dailyTicketCount,
  };

  const voteDetailShareModalProps: VoteDetailShareModalProps = {
    endDay,
    voteTitle: voteDetails.RESULTS.DATAS.VOTE_INFO.TITLE,
    onClose: () => setShareModalIsOpened(false),
    opened: shareModalIsOpened,
    confirmModalOpened: () => setCompletedShareModalIsOpen(true),
    stars: stars,
  };

  const completedShareModalProps: CompletedShareModalProps = {
    onClose: () => setCompletedShareModalIsOpen(false),
    opened: completedShareModalIsOpen,
  };

  const voteDetailListProps: VoteDetailListProps = {
    voteDetailStars: voteDetails.RESULTS.DATAS.VOTE_INFO.STARS,
    communityOnClick,
    shareOnClick,
    voteOnClick,
    scrollTargetId: typeof router.query.id === 'string' ? router.query.id : '',
    isRenderComplete: router.isReady,
  };

  const handleImagePopupClose = () => {
    setImagePopup(false);
    let VotePopupCount: number | undefined = getVoteCookie('VotePopupCount');
    const expire = dayjs().startOf('day').add(1, 'day').toDate();
    setVoteCookie('VotePopupCount', Number(VotePopupCount) + 1, {
      path: '/',
      expires: expire,
    });
  };

  return (
    <div css={{ background: '#FAFBFE' }}>
      <VoteDetailTemplate
        voteDetailHeader={<VoteDetailHeader {...voteDetailHeaderProps} />}
        voteDetailInfo={<VoteDetailInfo {...voteDetailInfoProps} />}
        voteDetailPrizeList={<VoteDetailPrizeList {...voteDetailPrizeListProps} />}
        voteDetailList={<VoteDetailList {...voteDetailListProps} />}
      />
      <VoteDetailImagePopup
        opened={imagePopup}
        setOpened={setImagePopup}
        onClose={handleImagePopupClose}
        language={language}
      />
      <VoteDetailShareModal {...voteDetailShareModalProps} />
      <CompletedShareModal {...completedShareModalProps} />
      <VoteProcessModal
        opened={voteModal}
        dailyTicketCount={dailyTicketCount}
        onClose={() => {
          setVoteModal(false);
        }}
        onVoteButtonClick={async () => {
          if (stars[1] && authCookie) {
            voteMutate.mutate({
              voteId: parseInt(router.query.vote_IDX as string),
              userId: authCookie,
              starId: parseInt(stars[1].STAR_IDX),
            });
          }
        }}
        star={stars[1]}
      />
      <VoteDoneModal
        onClose={() => {
          setVoteModalDone(0);
        }}
        isWebView={isWebView}
        dailyTicketCount={dailyTicketCount}
        moreVoteCount={voteModalDone}
        onWebViewLink={() => router.push(webViewLink)}
        starName={stars[1]?.STAR_NAME || '스타이름'}
      />
      <VoteBlockModal
        opened={voteModalBlock}
        onClose={() => {
          setVoteModalBlock(false);
        }}
        isWebView={isWebView}
        moreVoteCount={moreVoteCount}
        onWebViewLink={() => router.push(webViewLink)}
      />
      <VoteEndModal opened={voteModalEnd} onClose={() => setVoteModalEnd(false)} />
    </div>
  );
};

export default VoteDetailLayout;
