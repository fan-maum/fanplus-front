import { getCommunityPostData, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPostTemplate from '@/components/templates/CommunityPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { ServerLangType, UrlLangType } from '@/types/common';
import type { PartialUserType, PostResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';

export type CommunityPostPropType = {
  urlLang: UrlLangType;
  identity: string;
  user_idx: string;
  postIndex: number;
  serverLang: ServerLangType;
  communityPostData: PostResponseType;
};

const Post = ({
  urlLang,
  identity,
  user_idx,
  postIndex,
  serverLang,
  communityPostData,
  user,
}: CommunityPostPropType & { user: PartialUserType }) => {
  return (
    <CommunityMainLayout urlLang={urlLang} user={user}>
      <CommunityPostTemplate
        urlLang={urlLang}
        identity={identity}
        user_idx={user_idx}
        postIndex={postIndex}
        serverLang={serverLang}
        communityPostData={communityPostData}
      />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);

  const identity = context.req.cookies.user_id || '';
  const user_idx = context.req.cookies.user_idx;

  if (!boardIndex || !postIndex) return { notFound: true };

  const communityPostData = await getCommunityPostData(boardIndex, postIndex, identity, serverLang);
  if (communityPostData.RESULTS.DATAS.POST_INFO.IS_PUBLISH === 'N') return { notFound: true };

  const props = { urlLang, identity, user_idx, postIndex, serverLang, communityPostData };

  if (!!identity && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(identity, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { ...props, user } };
  }

  return { props };
};

export default Post;
