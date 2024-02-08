import { BookmarksResponseType } from '@/types/community';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import BookmarkArticleTable from '../organisms/community/mobile/BookmarkArticleTable';
import { UnstyledButton } from '../atoms';
import { colors } from '@/styles/CommunityColors';
import { getCommunityBoardData } from '@/api/Community';
import { BookmarkPropTypes } from '@/pages/[locale]/community/bookmark';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { openSideBarState } from '@/store/community';
import { BookmarkBoardsSkeleton } from '../molecules/community/CommunitySkeleton';
import { bookmarkTexts } from '@/texts/bookmarkTexts';

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
      const dataList = await bookmarks?.map(async (bookmark) => {
        return await getBookmarkedBoardsData(bookmark);
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
          {bookmarkBoards?.length !== 0 && (
            <div>
              <div>
                {bookmarkBoards?.map((boardData, index) => (
                  <BookmarkArticleTable
                    key={index}
                    communityBoardData={boardData}
                    communityBoardSSRdata={boardData}
                    isFetching={isFetching}
                    texts={boardTexts}
                    boardType={String(13)}
                  />
                ))}
              </div>
              <div css={{ textAlign: 'center', marginTop: '8px' }}>
                <UnstyledButton
                  css={{
                    dispaly: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '6px 8px',
                    height: '28px',
                    backgroundColor: colors.gray[100],
                    color: colors.gray[1000],
                    fontSize: '14px',
                    borderRadius: '6px',
                    fontWeight: 600,
                  }}
                  onClick={() => setOpenSidebar(true)}
                >
                  {bookmarksText.seeSideBar}
                </UnstyledButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommunityBookmarkTemplate;
