import { getCommunityBoardTopics, getCommunityPostData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { urlLangToBackLang } from '@/hooks/useLanguage';
import type { ServerLangType, BoardLangType, UrlLangType } from '@/types/common';
import type { CommunityBoardTopicResponseType, PostResponseType } from '@/types/community';
import { loginErrorHandler } from '@/utils/loginError';
import type { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

type CommunityPostWritePropType = {
  urlLang: UrlLangType;
  boardTopics: CommunityBoardTopicResponseType;
  communityPostData: PostResponseType;
  datas: {
    userId: string;
    boardIndex: number;
    postIndex: number;
    boardLang: ServerLangType;
    lang: ServerLangType;
  };
};

const Edit = ({ urlLang, boardTopics, communityPostData, datas }: CommunityPostWritePropType) => {
  return (
    <Layout urlLang={urlLang}>
      <PostEditorTemplate
        mode="EDIT"
        urlLang={urlLang}
        topics={boardTopics.RESULTS.DATAS.TOPIC_LIST}
        datas={datas}
        defaultValues={{
          topicIndex: parseInt(communityPostData.RESULTS.DATAS.POST_INFO.THUMBNAIL_IMG),
          title: communityPostData.RESULTS.DATAS.POST_INFO.POST_TITLE,
          content: communityPostData.RESULTS.DATAS.POST_INFO.POST_CONTENTS,
        }}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];
  const boardLangCookie = cookies['boardLang'] as BoardLangType;

  const urlLang = context.query.locale as UrlLangType;
  const backLang = urlLangToBackLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const boardLang: ServerLangType =
    boardLangCookie && boardLangCookie !== 'ALL' ? boardLangCookie : backLang;

  const boardTopics = await getCommunityBoardTopics(boardIndex, backLang);
  let communityPostData;
  try {
    communityPostData = await getCommunityPostData(boardIndex, postIndex, userId, backLang);
  } catch (error) {
    return loginErrorHandler(error, 'ko', `/community/board/${boardIndex}/${postIndex}/edit/`);
  }
  const datas = { userId, boardIndex, postIndex, boardLang, lang: backLang };
  return {
    props: { urlLang, boardTopics, communityPostData, datas },
  };
};

export default Edit;
