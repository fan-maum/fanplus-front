import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import {
  getCommunityPostCommentData,
  getCommunityPostData,
  getCommunityUnAuthPostCommentData,
  getCommunityUnAuthPostData,
} from '@/api/Community';
import { CommunityPostText_VIE, FooterText_VIE, NavBarText_VIE } from '@/texts/vi';
import Layout from '@/components/organisms/Layout';
import { CommunityPostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';
import { OrderType, TargetType } from '@/types/common';

const Post = ({ identity, lang, communityPostData, communityPostCommentData }: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <CommunityPostTemplate
        identity={identity}
        lang={lang}
        communityPostData={communityPostData}
        communityPostCommentData={communityPostCommentData}
        texts={CommunityPostText_VIE}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: CommunityPostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'vi';

  const cookies = nookies.get(context);
  const identity = cookies.user_id;

  const target_type = 'post' as TargetType;
  const target = postIndex;
  const order_by = (context.query.order_by as OrderType) || 'newest';
  const board_lang = 'ALL';
  const page = parseInt(context.query.page as string) - 1 || 0;
  const per_page = 20;

  if (!boardIndex || !postIndex) return { notFound: true };

  let communityPostData;
  let communityPostCommentData;
  if (identity !== null) {
    communityPostData = await getCommunityPostData(postIndex, identity);
    communityPostCommentData = await getCommunityPostCommentData(
      target_type,
      target,
      order_by,
      lang,
      page,
      identity,
      per_page
    );
  } else {
    communityPostData = await getCommunityUnAuthPostData(boardIndex, postIndex, lang);
    communityPostCommentData = await getCommunityUnAuthPostCommentData(
      target_type,
      target,
      order_by,
      board_lang,
      lang,
      page,
      per_page
    );
  }

  return {
    props: { identity, lang, communityPostData, communityPostCommentData },
  };
};

export default Post;
