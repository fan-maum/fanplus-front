import { getBookmarks, getCommunityBoardTopics } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type { BookmarksResponseType, CommunityBoardTopicResponseType } from '@/types/community';
import { noUserIdHandler } from '@/utils/loginError';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';

type CommunityPostWritePropType = {
  urlLang: UrlLangType;
  boardTopics: CommunityBoardTopicResponseType;
  datas: {
    userId: string;
    boardIndex: number;
    boardLang: ServerLangType;
    serverLang: ServerLangType;
  };
};

export interface bookmarksWriteProps extends CommunityPostWritePropType {
  bookmarksData: BookmarksResponseType;
}

const Write = ({ urlLang, boardTopics, datas, bookmarksData }: bookmarksWriteProps) => {
  const router = useRouter();
  return (
    <CommunityMainLayout urlLang={urlLang} bookmarksData={bookmarksData}>
      <PostEditorTemplate
        mode="CREATE"
        urlLang={urlLang}
        topics={boardTopics.RESULTS.DATAS.TOPIC_LIST}
        datas={datas}
        defaultValues={{ topicIndex: Number(router.query.topic) }}
      />
    </CommunityMainLayout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];
  const boardLangCookie = cookies['boardLang'] as BoardLangType;

  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const boardLang: ServerLangType =
    boardLangCookie && boardLangCookie !== 'ALL' ? boardLangCookie : serverLang;

  if (!userId) return noUserIdHandler('ko', `/community/board/${boardIndex}/write/`);

  const boardTopics = await getCommunityBoardTopics(boardIndex, serverLang);

  const bookmarksData = await getBookmarks(userId, 'ko_KR');

  const datas = { userId, boardIndex, boardLang, serverLang };
  return {
    props: { urlLang, boardTopics, datas, bookmarksData },
  };
};

export default Write;
