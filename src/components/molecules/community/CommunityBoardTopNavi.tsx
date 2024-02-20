import { useRouter } from 'next/router';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useQueryClient } from 'react-query';
import { BookmarksItemType } from '@/types/community';
import BoardMobileTabMenus from '@/components/organisms/community/mobile/BoardMobileTabMenus';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { openSideBarState, permissionModalState } from '@/store/community';
import BoardMobileTitle from './mobile/BoardMobileTitle';
import WriteButton from '@/components/atoms/WriteButton';
import { onClickWrite } from '@/utils/communityUtil';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  boardType: string | number;
  menuId: number | undefined;
};

const CommunityBoardTopNavi = ({
  boardTitle,
  boardType,
  menuId,
}: CommunityBoardTopNaviPropType) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const texts = communityBoardTexts[urlLang];
  const isCommunityOrBestBoard = boardType === 'community' || boardType === 2291;
  const queryClient = useQueryClient();
  const bookmarkQueryData: any = queryClient.getQueriesData('bookmarks')[0][1];

  const setOpenSidebar = useSetRecoilState(openSideBarState);
  const [permissionModal, setPermissionModal] = useRecoilState(permissionModalState);

  const bookmarkData =
    bookmarkQueryData &&
    bookmarkQueryData.find((bookmark: BookmarksItemType) => Number(bookmark.id) === menuId);
  const bookmarked = bookmarkData ? bookmarkData.isBookmarked : false;

  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 40,
          marginTop: 20,
          '@media (max-width: 768px)': { display: 'none' },
        }}
      >
        <div
          css={{
            display: 'inline-flex',
            alignItems: 'center',
            '@media (max-width: 768px)': { maxWidth: '48%' },
          }}
        >
          <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />
          <BoardMobileTitle
            boardTitle={boardTitle}
            bookmarked={bookmarked}
            menuId={menuId}
            onClickBack={() => router.back()}
          />
        </div>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          {!isCommunityOrBestBoard && (
            <WriteButton
              writeButtonText={texts.bottomTabBar.write}
              onClick={() => onClickWrite({ router, urlLang, setPermissionModal })}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
