import { getCommunityBoardTopics, getCommunityPostData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { CommunityPostEditorText_JAP, FooterText_JAP, NavBarText_JAP } from '@/texts/ja';
import { BackLangType, BoardLangType } from '@/types/common';
import { CommunityBoardTopicResponseType, PostResponseType } from '@/types/community';
import { loginErrorHandler } from '@/utils/loginErrorHandler';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

type CommunityPostWritePropType = {
  boardTopics: CommunityBoardTopicResponseType;
  communityPostData: PostResponseType;
  datas: {
    userId: string;
    boardIndex: number;
    postIndex: number;
    boardLang: BackLangType;
    lang: BackLangType;
  };
};

const Edit = ({ boardTopics, communityPostData, datas }: CommunityPostWritePropType) => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <PostEditorTemplate
        mode="EDIT"
        topics={boardTopics.RESULTS.DATAS.TOPIC_LIST}
        texts={CommunityPostEditorText_JAP}
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

  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang: BackLangType = 'ja';
  const boardLang: BackLangType =
    boardLangCookie && boardLangCookie !== 'ALL' ? boardLangCookie : lang;

  const boardTopics = await getCommunityBoardTopics(boardIndex, lang);
  let communityPostData;
  try {
    communityPostData = await getCommunityPostData(postIndex, userId);
  } catch (error) {
    return loginErrorHandler(error, 'ja', `/community/board/${boardIndex}/${postIndex}/edit/`);
  }
  const datas = { userId, boardIndex, postIndex, boardLang, lang };
  return {
    props: { boardTopics, communityPostData, datas },
  };
};

export default Edit;
