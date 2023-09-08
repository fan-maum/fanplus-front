import { GetServerSideProps } from 'next';
import { getCommunityPostCommentData, getCommunityPostData } from '@/api/Community';
import { CommunityPostText_ENG, FooterText_ENG, NavBarText_ENG } from '@/texts/en';
import Layout from '@/components/organisms/Layout';
import { CommunityPostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';
import { OrderType, TargetType } from '@/types/common';

const Post = ({ communityPostData, communityPostCommentData }: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_ENG}>
      <CommunityPostTemplate
        communityPostData={communityPostData}
        communityPostCommentData={communityPostCommentData}
        texts={CommunityPostText_ENG}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: CommunityPostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'en';

  const target_type = 'post' as TargetType;
  const target = postIndex;
  const order_by = (context.query.order_by as OrderType) || 'newest';
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
