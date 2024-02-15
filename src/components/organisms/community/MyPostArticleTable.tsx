import CommunityBoardArticle from '@/components/molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '@/components/molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '@/components/molecules/community/CommunityBoardArticleTableHeader';
import CommunityBoardPagination from '../CommunityBoardPagination';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { communityBoardTexts } from '@/texts/communityBoardTexts';

type MyPostArticleTableProps = {
  isPostExist: boolean;
  postList: any;
  VIEW_POSSIBLE_PAGE: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
};

const MyPostArticleTable = ({
  isPostExist,
  postList,
  VIEW_POSSIBLE_PAGE,
  handlePageChange,
}: MyPostArticleTableProps) => {
  const urlLang = useUrlLanguage();
  const boardTexts = communityBoardTexts[urlLang];
  return (
    <div>
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
                    texts={boardTexts}
                  />
                </li>
              );
            })}
          </ul>
          <CommunityBoardPagination
            viewPossiblePage={Number(VIEW_POSSIBLE_PAGE)}
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

export default MyPostArticleTable;
