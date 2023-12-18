import {
  getCommunityBoardCategoryData,
  getCommunityBoardData,
  getCommunityBoardResultData,
} from '@/api/Community';
import BestNotices from '@/components/molecules/community/BestNotices';
import Layout from '@/components/organisms/Layout';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardCategoryResponseType,
  CommunityBoardResponseType,
  CommunityBoardResultResponseType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

type InitialBoardResultProps = {
  category_type: number;
  searchValue: string;
  serverLang: ServerLangType;
  page: number;
};

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData: CommunityBoardResultResponseType;
  initialProps: InitialBoardResultProps;
  userId: string;
  boardIndex: number;
  boardLangCookie: BoardLangType;
  communityBoardData: CommunityBoardResponseType;
  initialBestBoardProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    topic: number;
    view_type: string;
  };
};

interface MyPostPageProps {
  urlLang: UrlLangType;
}

const MyPostPage = ({ urlLang }: MyPostPageProps) => {
  return (
    <CommunityMainLayout urlLang={urlLang}>
      <div css={{ display: 'flex', gap: 20 }}>
        <div css={{ width: '100%', minWidth: 810 }}>내가 쓴 글</div>
        <BestNotices />
      </div>
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;

  return {
    props: {
      urlLang,
    },
  };
};

export default MyPostPage;
