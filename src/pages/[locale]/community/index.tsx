import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, UrlLangType } from '@/types/common';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityPropTypes = {
  urlLang: UrlLangType;
};

const CommunityHomePage = ({ urlLang }: CommunityPropTypes) => {
  return (
    <CommunityMainLayout urlLang={urlLang} withSearchInput>
      <CommunityPageTemplate />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const view_type = (context.query.view as string) || 'all';
  const page = parseInt(context.query.page as string) - 1 || 1;
  const boardType = 'community';

  return { props: { urlLang } };
};

export default CommunityHomePage;
