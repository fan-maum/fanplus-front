import type { MyPostPageProps } from '@/pages/[locale]/community/myPost';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useRouter } from 'next/router';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '../molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '../molecules/community/CommunityBoardArticleTableHeader';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import BoardMobileTitle from '../molecules/community/mobile/BoardMobileTitle';

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
    <div css={{ minWidth: 810, '@media(max-width:960px)': { width: '100%', minWidth: 320 } }}>
      <BoardMobileTitle boardTitle={texts.bottomTabBar.myPost} onClickBack={() => router.back()} />
      {isPostExist ? (
        <div>
          <CommunityBoardArticleTableHeader firstHeader={'board'} isMyPost />
          <ul>
            {postList?.map((post: any, idx: number) => {
              return (
                <li key={'MyPosts' + idx} css={{ borderBottom: '1px solid #d9d9d9' }}>
                  <CommunityBoardArticle
                    postItem={post}
                    firstHeader={post.BOARD_TITLE}
                    link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}`}
                    isMyPost
                  />
                  <CommunityBoardArticleMobile
                    postItem={post}
                    link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}`}
                    texts={texts}
                  />
                </li>
              );
            })}
          </ul>
          <CommunityBoardPagination
            viewPossiblePage={Number(boardInfo.VIEW_POSSIBLE_PAGE)}
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
