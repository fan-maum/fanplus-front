import { getUser } from '@/api/Community';
import { getBookmarks } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityMyPostTemplate from '@/components/templates/CommunityMyPostTemplate';
import type { UrlLangType } from '@/types/common';
import type { PartialUserType } from '@/types/community';
import { BookmarksResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';
export interface MyPostPageProps {
  urlLang: UrlLangType;
  userId: string;
  myPostData: any;
}

const MyPostPage = ({
  urlLang,
  user,
  userId,
  myPostData,
  bookmarksData,
}: MyPostPageProps & { user: PartialUserType } & { bookmarksData: BookmarksResponseType }) => {
  return (
    <CommunityMainLayout urlLang={urlLang} user={user} bookmarksData={bookmarksData}>
      <CommunityMyPostTemplate urlLang={urlLang} userId={userId} myPostData={myPostData} />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const user_id = context.req.cookies.user_id || null;
  const user_idx = context.req.cookies.user_idx;

  const myPostData = {
    RESULTS: {
      ERROR: 0,
      MSG: 'success',
      DATAS: {
        BOARD_INFO: {
          BOARD_IDX: '91',
          BOARD_TITLE: '김태리',
          HEAD_IMG: 'http://cdnetphoto.appphotocard.com/',
          BOARD_ICON: 'star_icon/4600.png',
          POST_CNT: 1,
          IS_GROUP: 'N',
          IS_TREND: 'N',
        },
        POST_LIST: [
          {
            POST_IDX: '6657031',
            BOARD_IDX: '91',
            BOARD_TITLE: '김태리',
            TOPIC_NAME: '소통',
            POST_TITLE: '헤이',
            POST_IMG_YN: 'N',
            SUMNAIL_IMG: 'http://cdnetphoto.appphotocard.com/',
            WRITER_IDX: '3482626',
            PUBLISH_DATE: '2023-09-22 11:26:36',
            VIEW_CNT: '0',
            COMMENT_CNT: '0',
            RECOMMEND_CNT: '0',
            HAS_BEST_BADGE: '0',
            HAS_POPULAR_BADGE: '0',
            HEAD_IDX: null,
            HEAD_NAME: null,
            WRITER_NAME: 'giniginigigaginie',
            WRITER_PROFILE_IMG:
              'http://cdnetphoto.appphotocard.com/profile_images/20230217115725_3482626.jpg',
            NEW_POST_YN: 'Y',
          },
        ],
      },
      TIMESTAMP: 1695349603,
    },
  };
  let bookmarksData;
  if (user_id === null) {
    bookmarksData = { SUBSCRIPTION_BOARDS: [] };
  } else {
    bookmarksData = await getBookmarks(user_id, urlLang);
  }

  if (!!user_id && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(user_id, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { urlLang, userId: user_id, myPostData, user } };
  }
  return {
    props: {
      urlLang,
      userId: user_id,
      myPostData,
      bookmarksData,
    },
  };
};

export default MyPostPage;
