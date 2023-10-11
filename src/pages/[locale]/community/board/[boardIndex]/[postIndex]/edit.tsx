import { getCommunityBoardTopics, getCommunityPostData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { urlLangToBackLang } from '@/hooks/useLanguage';
import { CommunityPostEditorText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import { BackLangType, BoardLangType } from '@/types/common';
import { CommunityBoardTopicResponseType, PostResponseType } from '@/types/community';
import { loginErrorHandler } from '@/utils/loginErrorHandler';
import { LangCookie } from '@/utils/setLangCookie';
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
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <PostEditorTemplate
        mode="EDIT"
        topics={boardTopics.RESULTS.DATAS.TOPIC_LIST}
        texts={CommunityPostEditorText_KR}
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

  const urlLang = (context.query.locale || 'en') as LangCookie;
  const backLang = urlLangToBackLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const boardLang: BackLangType =
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
    props: { boardTopics, communityPostData, datas },
  };
};

export default Edit;
