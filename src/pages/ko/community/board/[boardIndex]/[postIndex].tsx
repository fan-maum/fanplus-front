import { GetServerSideProps } from 'next';
import { getCommunityPostCommentData, getCommunityPostData } from '@/api/Community';
import { CommunityPostText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import Layout from '@/components/organisms/Layout';
import { CommunityPostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';
import { LangCookie } from '@/utils/setLangCookie';
import { translateFrontLangToBackLang } from '@/hooks/useLanguage';
import { OrderType, TargetType } from '@/types/common';

const Post = ({ communityPostData, communityPostCommentData }: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <CommunityPostTemplate
        communityPostData={communityPostData}
        communityPostCommentData={communityPostCommentData}
        texts={CommunityPostText_KR}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: CommunityPostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'ko';

  const target_type = 'post' as TargetType;
  const target = postIndex;
  const order_by = (context.query.order_by as OrderType) || 'oldest';
  const board_lang = 'ALL';
  const page = parseInt(context.query.page as string) - 1 || 0;
  const per_page = 20;

  if (!boardIndex || !postIndex) return { notFound: true };

  const communityPostData = await getCommunityPostData(boardIndex, postIndex, lang);
  const communityPostCommentData = await getCommunityPostCommentData(
    target_type,
    target,
    order_by,
    board_lang,
    lang,
    page,
    per_page
  );

  return {
    props: { communityPostData, communityPostCommentData },
  };
};

export default Post;