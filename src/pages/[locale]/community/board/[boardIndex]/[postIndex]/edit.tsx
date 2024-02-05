import {
  getBookmarks,
  getCommunityBoardTopics,
  getCommunityPostData,
  getUser,
} from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardTopicResponseType,
  PartialUserType,
  PostResponseType,
} from '@/types/community';
import { loginErrorHandler, noUserIdHandler } from '@/utils/loginError';
import type { GetServerSidePropsContext } from 'next';
import { useQuery } from 'react-query';

type CommunityPostWritePropType = {
  urlLang: UrlLangType;
  boardTopics: CommunityBoardTopicResponseType;
  communityPostData: PostResponseType;
  datas: {
    userId: string;
    boardIndex: number;
    postIndex: number;
    boardLang: ServerLangType;
    serverLang: ServerLangType;
  };
  user: PartialUserType;
};

const Edit = ({
  urlLang,
  boardTopics,
  communityPostData,
  datas,
  user,
}: CommunityPostWritePropType) => {
  const { boardLang } = datas;
  const { data } = useQuery(['bookmarks', { userId: datas.userId, urlLang }], () =>
    getBookmarks(datas.userId, urlLang)
  );
  const bookmarks = data ?? [];
  return (
    <CommunityMainLayout
      urlLang={urlLang}
      boardLangCookie={boardLang}
      bookmarks={bookmarks}
      user={user}
    >
      <PostEditorTemplate
        mode="EDIT"
        urlLang={urlLang}
        topics={boardTopics.RESULTS.DATAS.TOPIC_LIST}
        datas={datas}
        defaultValues={{
          topicIndex: parseInt(communityPostData.RESULTS.DATAS.POST_INFO.TOPIC_IDX),
          title: communityPostData.RESULTS.DATAS.POST_INFO.POST_TITLE,
          content: communityPostData.RESULTS.DATAS.POST_INFO.POST_CONTENTS,
        }}
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
  const postIndex = parseInt(context.query.postIndex as string);
  const boardLang: ServerLangType =
    boardLangCookie && boardLangCookie !== 'ALL' ? boardLangCookie : serverLang;

  if (!userId || !userIdx) return noUserIdHandler(urlLang, `/community/board/${boardIndex}/write/`);

  const boardTopics = await getCommunityBoardTopics(boardIndex, serverLang);
  let communityPostData;
  try {
    communityPostData = await getCommunityPostData(boardIndex, postIndex, userId, serverLang);
  } catch (error) {
    return loginErrorHandler(error, urlLang, `/community/board/${boardIndex}/${postIndex}/edit/`);
  }
  const datas = { userId, boardIndex, postIndex, boardLang, serverLang };

  const { NICK, PROFILE_IMG_URL } = (await getUser(userId, userIdx)).RESULTS.DATAS;
  const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };

  return {
    props: { urlLang, boardTopics, communityPostData, datas, user },
  };
};

export default Edit;
