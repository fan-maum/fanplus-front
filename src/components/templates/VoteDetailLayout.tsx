import VoteDetailTemplate from './VoteDetailTemplate';
import VoteDetailHeader from '@/components/organisms/voteDetail/VoteDetailHeader';
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
import { VoteDetailResponse } from '@/types/vote';
import { getLanguage } from '@/hooks/useLanguage';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';

export interface VotesLayoutProps {
  voteDetails: VoteDetailResponse;
  error: number | boolean;
}

const VoteDetailLayout = ({ voteDetails, error }: VotesLayoutProps) => {
  console.log(voteDetails);

  const language = getLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];

  const voteDetailInfoProps: VoteDetailInfoProps = {
    voteDetailInfo: voteDetails.RESULTS.DATAS.VOTE_INFO,
  };

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

  const voteDetailListProps: VoteDetailListProps = {
    voteDetailStars: voteDetails.RESULTS.DATAS.VOTE_INFO.STARS,
    //   shareOnClick,
    //   voteOnClick,
  };

  return (
    <div css={{ background: '#FAFBFE' }}>
      <VoteDetailTemplate
        voteDetailHeader={<VoteDetailHeader />}
        voteDetailInfo={<VoteDetailInfo {...voteDetailInfoProps} />}
        voteDetailPrizeList={<VoteDetailPrizeList {...voteDetailPrizeListProps} />}
        voteDetailList={<VoteDetailList {...voteDetailListProps} />}
      />
      {/* <>testDiaLog</> */}
    </div>
  );
};

export default VoteDetailLayout;
