import { useState, useEffect } from 'react';
import VoteListTab, { VoteListTabProps } from '@/components/molecules/VoteListTab';
import VoteList, { VoteListProps } from '@/components/organisms/VoteList';
import VotePagination, { VotePaginationProps } from '@/components/organisms/VotePagination';
import VoteTemplate from '@/components/templates/VoteTemplate';
import { useMediaQuery } from 'react-responsive';
import { VoteResponse } from '@/types/vote';
import { useRecoilState } from 'recoil';
import { voteLangState } from '@/store/voteLangState';
import { useUrlLanguage } from '@/hooks/useLanguage';

export interface VotesLayoutProps {
  voteLists: VoteResponse;
  error: number | boolean;
}

const VotesLayout = ({ voteLists, error }: VotesLayoutProps) => {
  const language = useUrlLanguage();
  const voteLanguage = useRecoilState(voteLangState(language))[0];

  /* mediaQuery 설정 */
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width:768px)' });

  /* 공통 설정 */
  const [tabState, setTabState] = useState<'' | 'B' | 'R'>('');
  const itemsPerPage = !isMobile ? 9 : 5;

  const VoteListTabProps: VoteListTabProps = {
    tabs: [
      { label: voteLanguage?.tab.all, value: '' },
      { label: voteLanguage?.tab.bday, value: 'B' },
      { label: voteLanguage?.tab.league, value: 'R' },
    ],
    state: [tabState, setTabState],
    itemsPerPage: itemsPerPage,
  };

  useEffect(() => {
    if (mobile) setIsMobile(true);
    if (!mobile) setIsMobile(false);
  }, [mobile]);

  const VoteListProps: VoteListProps = {
    loading: false,
    error: null,
    voteList: voteLists.RESULTS.DATAS.DATA,
  };

  const VotePaginationProps: VotePaginationProps = {
    totalCount: voteLists.RESULTS.DATAS.TOTAL_CNT,
    itemsPerPage: itemsPerPage,
    isMobile: isMobile,
  };

  return (
    <VoteTemplate
      voteListTab={<VoteListTab {...VoteListTabProps} />}
      voteList={<VoteList {...VoteListProps} />}
      votePagination={<VotePagination {...VotePaginationProps} />}
    />
  );
};

export default VotesLayout;
