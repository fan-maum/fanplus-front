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
import { GetLanguage, getVoteDetailLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';
import { useEffect, useState } from 'react';
import VoteDetailShareModal, {
  VoteDetailShareModalProps,
} from '@/components/modals/VoteDetailShareModal';
import { useRouter } from 'next/router';
import CompletedShareModal, { CompletedShareModalProps } from '../modals/CompletedShareModal';
import CommonModal from '../modals/CommonModal';
import VoteProcessModal, { VoteProcessModalProps } from '../modals/VoteProcessModal';
import VoteDoneModal from '../modals/VoteDoneModal';
import VoteBlockModal from '../modals/VoteBlockModal';
import { useMutation } from 'react-query';
import { getVoteDetail, postVotes } from '@/api/Vote';
import { ParsedUrlQuery } from 'querystring';

export interface VotesLayoutProps {
  voteDetails: VoteDetailResponse;
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
  voteDetails,
  headers,
  authCookie,
  isWebView,
  error,
}: VotesLayoutProps) => {
  // console.log(isWebView);

  const endDay = new Date(voteDetails.RESULTS.DATAS.VOTE_INFO.END_DATE);
  const router = useRouter();
  const language = GetLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  const [shareModalIsOpened, setShareModalIsOpened] = useState(false);
  const [completedShareModalIsOpen, setCompletedShareModalIsOpen] = useState(false);
  const [stars, setStars] = useState<(VoteDetailStars | null)[]>([null, null, null]);
  const [data, setData] = useState(voteDetails);

  const [voteModalBlock, setVoteModalBlock] = useState(false);
  const [voteModal, setVoteModal] = useState(false);
  const [voteModalDone, setVoteModalDone] = useState(0);

  const webViewLink = `https://p7m9w.app.goo.gl/?link=${encodeURIComponent(
    `https://vote.fanplus.co.kr/?vote=${router.query.vote_IDX}&photocard_type=share_vote&vote_idx=${router.query.vote_IDX}&apn=com.photocard.allstar&amv=100&ibi=com.photocard.master&isi=1448805815`
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
    const query = { ...router.query };
    query.id = starId;
    let nextQuery = '?';
    for (const key in query) nextQuery += key + '=' + query[key] + ';';
    return nextQuery.slice(0, nextQuery.length - 1);
  };

  // ! setting 하는 Data가 다를 것..
  async function handleRefresh() {
    const voteIndex = router.query['vote_IDX'] as string;
    const lang = getVoteDetailLanguage() as string;
    const res = await (await getVoteDetail(voteIndex, lang)).json();
    if (Object.keys(res).length) {
      setData(res);
    }
  }

  const voteMutate = useMutation(
    'vote-mutate',
    async (param: VoteMutateParam) => postVotes(param),
    {
      onSuccess: async (data) => {
        setVoteModal(false);
        if (data.RESULTS.MSG === '투표 완료') {
          // * 투표가 성공한 케이스
          await handleRefresh();
          await router.push({ query: { ...router.query, id: stars[1]?.STAR_IDX } }, undefined, {
            shallow: true,
          });
          setVoteModalDone(1); // TODO: 여기도
        } else {
          setVoteModalBlock(true);
        }
      },
    }
  );

  useEffect(() => {
    if (stars[1]) {
      const starData = findStarIndexById(stars[1].STAR_IDX, voteDetails);
      if (starData) setStarWithIndex(starData?.index);
    }
  }, [voteDetails]);

  useEffect(() => {
    const starId = String(router.query.id);
    if (
      starId &&
      // typeof router.query.login === 'string' &&
      authCookie &&
      findStarById(starId, voteDetails)
    ) {
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

  const voteOnClick = (id: string) => {
    if (authCookie) {
      const stars = voteDetails.RESULTS.DATAS.VOTE_INFO.STARS;
      const starIndex = stars.findIndex((star) => star.STAR_IDX === id);
      setStarWithIndex(starIndex);
      setVoteModal(true); // * 테스트 => 투표하시겠습니까? 모달
    } else {
      const nextPath = router.pathname;
      const nextQuery = setNextQueryWithId(id);
      router.push({ pathname: '/login', query: { nextUrl: nextPath + nextQuery } });
    }
    // setVoteModalDone(3); // * 테스트 => 투표완료되었습니다. 모달
    // setVoteModalBlock(true); // * 테스트 => 이미 투표했음. 모달
  };

  const voteDetailHeaderProps: VoteDetailHeaderProps = {
    voteTitle: voteDetails.RESULTS.DATAS.VOTE_INFO.TITLE,
    confirmModalOpened: () => setCompletedShareModalIsOpen(true),
  };

  const voteDetailInfoProps: VoteDetailInfoProps = {
    voteDetailInfo: voteDetails.RESULTS.DATAS.VOTE_INFO,
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
    shareOnClick,
    voteOnClick,
    scrollTargetId: typeof router.query.id === 'string' ? router.query.id : '',
    isRenderComplete: router.isReady,
  };

  return (
    <div css={{ background: '#FAFBFE' }}>
      <VoteDetailTemplate
        voteDetailHeader={<VoteDetailHeader {...voteDetailHeaderProps} />}
        voteDetailInfo={<VoteDetailInfo {...voteDetailInfoProps} />}
        voteDetailPrizeList={<VoteDetailPrizeList {...voteDetailPrizeListProps} />}
        voteDetailList={<VoteDetailList {...voteDetailListProps} />}
      />
      <VoteDetailShareModal {...voteDetailShareModalProps} />
      <CompletedShareModal {...completedShareModalProps} />
      <VoteProcessModal
        opened={voteModal}
        onClose={() => {
          setVoteModal(false);
        }}
        onVoteButtonClick={() => {
          if (stars[1] && authCookie) {
            voteMutate.mutate({
              voteId: parseInt(router.query.vote_IDX as string),
              userId: authCookie,
              starId: parseInt(stars[1].STAR_IDX),
            });
          }
          setVoteModal(false);
        }}
        star={stars[1]}
      />
      <VoteDoneModal
        onClose={() => {
          setVoteModalDone(0);
        }}
        isWebView={isWebView}
        resultQuantity={voteModalDone}
        onWebViewLink={() => window.open(webViewLink)}
        starName={stars[1]?.STAR_NAME || '스타이름'}
      />
      <VoteBlockModal
        opened={voteModalBlock}
        onClose={() => {
          setVoteModalBlock(false);
        }}
        isWebView={isWebView}
        onWebViewLink={() => window.open(webViewLink)}
      />
    </div>
  );
};

export default VoteDetailLayout;
