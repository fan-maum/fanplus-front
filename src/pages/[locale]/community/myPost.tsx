import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityMyPostTemplate from '@/components/templates/CommunityMyPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { BoardLangType, UrlLangType } from '@/types/common';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
export interface MyPostPageProps {
  urlLang: UrlLangType;
  userId: string | null;
  myPostData: any;
}

const MyPostPage = ({ urlLang, userId, myPostData }: MyPostPageProps) => {
  return (
    <CommunityMainLayout urlLang={urlLang}>
      <CommunityMyPostTemplate urlLang={urlLang} userId={userId} myPostData={myPostData} />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const view_type = (context.query.view as string) || 'all';
  const page = parseInt(context.query.page as string) - 1 || 0;

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

  return {
    props: {
      urlLang,
      userId,
      myPostData,
    },
  };
};

export default MyPostPage;
