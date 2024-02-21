import { BookmarksResponseType } from '@/types/community';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import BookmarkArticleTable from '../organisms/community/mobile/BookmarkArticleTable';
import { Stack } from '../atoms';
import { getCommunityBoardData } from '@/api/Community';
import { BookmarkPropTypes } from '@/pages/[locale]/community/bookmark';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { openSideBarState } from '@/store/community';
import { BookmarkBoardsSkeleton } from '../molecules/community/CommunitySkeleton';
import { bookmarkTexts } from '@/texts/bookmarkTexts';
import NoBookmarkMessage from '../molecules/community/NoBookMarkMessage';
import styled from '@emotion/styled';
import OpenSideBardButton from '../atoms/OpenSideBardButton';

interface CommunityBookmarkTemplateProps extends BookmarkPropTypes {
  bookmarks: BookmarksResponseType;
}

const CommunityBookmarkTemplate = ({
  queryParams,
  initialProps,
  bookmarks,
}: CommunityBookmarkTemplateProps) => {
  const { urlLang, userId, boardLangCookie, maxPage } = queryParams;
  const { page, serverLang, topic, view_type } = initialProps;
  const boardTexts = communityBoardTexts[urlLang];
  const bookmarksText = bookmarkTexts[urlLang];
  const setOpenSidebar = useSetRecoilState(openSideBarState);
  const perPage = 3;

  async function getBookmarkedBoardsData(bookmark: any) {
    const boardType = bookmark.slug === 'all' ? 'community' : bookmark.slug;
    return await getCommunityBoardData(
      userId,
      boardType,
      page,
      perPage,
      serverLang,
      boardLangCookie,
      view_type,
      topic,
      maxPage
    );
  }

  const { data: bookmarkBoards, isFetching } = useQuery(
    ['bookmarkBoards', bookmarks],
    async () => {
      const dataList = bookmarks?.map((bookmark) => {
        return getBookmarkedBoardsData(bookmark);
      });
      return await Promise.all(dataList);
    },
    {
      enabled: !!bookmarks,
    }
  );

  return (
    <div css={{ display: 'none', '@media(max-width: 768px)': { display: 'block' } }}>
      {isFetching ? (
        <BookmarkBoardsSkeleton />
      ) : (
        <>
          {bookmarkBoards?.length !== 0 ? (
            <div>
              <div>
                {bookmarkBoards?.map((boardData, index) => (
                  <BookmarkArticleTable
                    key={index}
                    communityBoardData={boardData}
                    communityBoardSSRdata={boardData}
                    isFetching={isFetching}
                    texts={boardTexts}
                    boardType={
                      boardData.BOARD_INFO.menu.slug === 'all'
                        ? 'community'
                        : boardData.BOARD_INFO.menu.slug
                    }
                  />
                ))}
              </div>
              <div css={{ textAlign: 'center', marginTop: '8px' }}>
                <OpenSideBardButton
                  seeSideBarText={bookmarksText.seeSideBar}
                  setOpenSidebar={setOpenSidebar}
                />
              </div>
            </div>
          ) : (
            <NoBookmarkBoardWrapper>
              <Stack color="#000" fz={18} fw={600} spacing={10}>
                <span>자주 찾는 게시판을</span>
                <span>즐겨찾기 할 수 있습니다.</span>
              </Stack>
              <NoBookmarkMessage urlLang={urlLang} variant="primary" />
              <OpenSideBardButton
                seeSideBarText={bookmarksText.seeSideBar}
                setOpenSidebar={setOpenSidebar}
              />
            </NoBookmarkBoardWrapper>
          )}
        </>
      )}
    </div>
  );
};

export default CommunityBookmarkTemplate;

const NoBookmarkBoardWrapper = styled.div`
  width: 100%;
  height: 60vh;
  padding: 0 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 30px;
`;
