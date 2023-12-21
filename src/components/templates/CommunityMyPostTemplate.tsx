import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useRouter } from 'next/router';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '../molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '../molecules/community/CommunityBoardArticleTableHeader';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import CommunityBoardNoPost from '../organisms/community/CommunityBoardNoPost';
import { MyPostPageProps } from '@/pages/[locale]/community/myPost';

const CommunityMyPostTemplate = ({ urlLang, userId, myPostData }: MyPostPageProps) => {
  const router = useRouter();
  const texts = communityBoardTexts[urlLang];
  const postList = myPostData.RESULTS.DATAS.POST_LIST;
  const boardInfo = myPostData.RESULTS.DATAS.BOARD_INFO;

  const isPostExist = !(postList.length === 0 && (!router.query.page || router.query.page === '1'));

  // const onClickWrite = () => {
  //   const writeBanBoard = ['139', '192', '220'];
  //   const writeBanned = writeBanBoard.includes(boardInfo.BOARD_IDX);
  //   if (writeBanned) {
  //     setPermissionModal(true);
  //     return;
  //   }
  //   if (!userId) {
  //     const path = router.asPath;
  //     router.push({ pathname: '/login', query: { nextUrl: path } });
  //     return;
  //   }
  //   router.push(`/${urlLang}/community/board/${boardInfo.BOARD_IDX}/write`);
  // };

  const handlePageChange = (selectedItem: { selected: number }) => {
    router.replace({ query: { ...router.query, page: selectedItem.selected + 1 } });
  };

  return (
    <div>
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
          <CommunityBoardArticleTableHeader />
          <ul>
            {postList?.map((post: any, idx: number) => {
              return (
                <>
                  <CommunityBoardArticle
                    firstHeader="board"
                    key={'CommunityBoardArticle' + idx}
                    postItem={post}
                    link={`/${urlLang}/community/board/${boardInfo?.BOARD_IDX}/${post.POST_IDX}`}
                  />
                  <CommunityBoardArticleMobile
                    key={'CommunityBoardArticleMobile' + idx}
                    firstHeader="board"
                    postItem={post}
                    link={`/${urlLang}/community/board/${boardInfo?.BOARD_IDX}/${post.POST_IDX}`}
                    texts={texts}
                  />
                </>
              );
            })}
          </ul>
          <CommunityBoardPagination
            totalCount={boardInfo?.POST_CNT as number}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : (
        <CommunityBoardNoPost
          // onClickWrite={onClickWrite}
          buttonText={texts.buttonWrite}
          texts={texts.noMyPostTexts}
        />
      )}
    </div>
  );
};

export default CommunityMyPostTemplate;
