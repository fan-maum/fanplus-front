import type { MyPostPageProps } from '@/pages/[locale]/community/myPost';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useRouter } from 'next/router';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '../molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '../molecules/community/CommunityBoardArticleTableHeader';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import { Fragment } from 'react';

const CommunityMyPostTemplate = ({ urlLang, userId, communityMyPostData }: MyPostPageProps) => {
  const router = useRouter();
  const texts = communityBoardTexts[urlLang];
  const boardInfo = communityMyPostData.BOARD_INFO;
  const postList = communityMyPostData.POST_LIST;

  const isPostExist = !(postList.length === 0 && (!router.query.page || router.query.page === '1'));

  const handlePageChange = (selectedItem: { selected: number }) => {
    router.replace({ query: { ...router.query, page: selectedItem.selected + 1 } });
  };

  return (
    <div css={{ minWidth: 810 }}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          height: 40,
          fontSize: 18,
          fontWeight: 600,
          color: '#000',
          marginBottom: '10px',
        }}
      >
        {texts.bottomTabBar.myPost}
      </div>
      {isPostExist ? (
        <div>
          <CommunityBoardArticleTableHeader firstHeader={'board'} />
          <ul>
            {postList?.map((post: any, idx: number) => {
              return (
                <Fragment key={'MyPosts' + idx}>
                  <CommunityBoardArticle
                    postItem={post}
                    // firstHeader={post.BOARD_TITLE}
                    firstHeader={post.TOPIC_NAME}
                    link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}`}
                  />
                  <CommunityBoardArticleMobile
                    postItem={post}
                    link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}`}
                    texts={texts}
                  />
                </Fragment>
              );
            })}
          </ul>
          <CommunityBoardPagination
            totalCount={boardInfo.VIEW_POSSIBLE_PAGE as number}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : (
        <div>
          <CommunityBoardArticleTableHeader />
        </div>
      )}
    </div>
  );
};

export default CommunityMyPostTemplate;
