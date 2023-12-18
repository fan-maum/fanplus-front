import { getCommunityBoardResultData } from '@/api/Community';
import CommunityBoardFilterTab from '@/components/organisms/community/CommunityBoardFilterTab';
import CommunityBoardSearchInputWrapper from '@/components/organisms/community/CommunityBoardSearchInputWrapper';
import CommunitySearchBoardPagination from '@/components/organisms/community/CommunitySearchBoardPagination';
import CommunitySearchBoardWrapper from '@/components/organisms/community/CommunitySearchBoardWrapper';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { CommunityPropTypes } from '@/pages/[locale]/community';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import type { CommunityPageTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import { BoardItemListSkeleton } from '../molecules/community/CommunitySkeleton';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import CommunityLayout from './CommunityLayout';
import CommunityBoardArticleTable from '../organisms/community/CommunityBoardArticleTable';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import PopularBoardsMobile from '../molecules/community/PopularBoardsMobile';
import BestNotices from '../molecules/community/BestNotices';
import NotificationBoard from '../molecules/community/NotificationBoard';
import HorizontalBestNotices from '../molecules/community/HorizontalBestNotices';
import CommunityBoardTemplate from './CommunityBoardTemplate';

type TabBarType = 'boards' | 'bestPopular';

const CommunityPageTemplate = () => {
  return (
    <div css={{ width: 810, height: 600 }}>
      <div css={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <HorizontalBestNotices />
        <NotificationBoard />
      </div>
    </div>
  );
};

export default CommunityPageTemplate;

type TabBarPropTypes = {
  tabTitles: {
    boards: string;
    bestPopular: string;
  };
  tabBar: TabBarType;
  texts: CommunityPageTextType;
  setTabBar: Dispatch<SetStateAction<TabBarType>>;
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
};
