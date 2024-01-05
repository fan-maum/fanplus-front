import { getUser, getCommunityBoardTopics } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type { CommunityBoardTopicResponseType, PartialUserType } from '@/types/community';
import { noUserIdHandler } from '@/utils/loginError';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

type CommunityPostWritePropType = {
  urlLang: UrlLangType;
  boardTopics: CommunityBoardTopicResponseType;
  datas: {
    userId: string;
    boardIndex: number;
    boardLang: ServerLangType;
    serverLang: ServerLangType;
  };
  user: PartialUserType;
};

const Write = ({ urlLang, boardTopics, datas, user }: CommunityPostWritePropType) => {
  const router = useRouter();
  return (
    <CommunityMainLayout urlLang={urlLang} user={user}>
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
  const cookies = context.req.cookies;
  const userId = cookies.user_id;
  const userIdx = cookies.user_idx;
  const boardLangCookie = cookies.boardLang as BoardLangType;

  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const boardLang: ServerLangType =
    boardLangCookie && boardLangCookie !== 'ALL' ? boardLangCookie : serverLang;

  if (!userId || !userIdx) return noUserIdHandler(urlLang, `/community/board/${boardIndex}/write/`);

  const boardTopics = await getCommunityBoardTopics(boardIndex, serverLang);

  const datas = { userId, boardIndex, boardLang, serverLang };

  const { NICK, PROFILE_IMG_URL } = (await getUser(userId, userIdx)).RESULTS.DATAS;
  const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };

  return {
    props: { urlLang, boardTopics, datas, user },
  };
};

export default Write;
