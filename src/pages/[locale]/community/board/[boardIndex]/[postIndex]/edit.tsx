import { getCommunityBoardTopics, getCommunityPostData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type { CommunityBoardTopicResponseType, PostResponseType } from '@/types/community';
import { noUserIdHandler } from '@/utils/loginError';
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
    serverLang: ServerLangType;
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
          topicIndex: Number(communityPostData.RESULTS.DATAS.POST_INFO.THUMBNAIL_IMG),
          title: communityPostData.RESULTS.DATAS.POST_INFO.POST_TITLE,
          content: communityPostData.RESULTS.DATAS.POST_INFO.POST_CONTENTS,
        }}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = Number(context.query.boardIndex);
  const postIndex = Number(context.query.postIndex);

  const cookies = context.req.cookies;
  const userId = cookies.user_id;

  if (!userId) {
    return noUserIdHandler(urlLang, `/community/board/${boardIndex}/${postIndex}/edit/`);
  }

  const datas = { userId, boardIndex, postIndex, serverLang };

  const boardTopics = await getCommunityBoardTopics(boardIndex, serverLang);
  const communityPostData = await getCommunityPostData(boardIndex, postIndex, userId, serverLang);

  return {
    props: { urlLang, datas, boardTopics, communityPostData },
  };
};

export default Edit;
