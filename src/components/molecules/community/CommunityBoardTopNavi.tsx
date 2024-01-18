import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
<<<<<<< HEAD
import { colors } from '@/styles/CommunityColors';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import { BoardLangType } from '@/types/common';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { getCookie } from '@/utils/Cookie';
import CommunityBoardLangSelector from './CommunityBoardLangSelector';
import { communityBoardTexts } from '@/texts/communityBoardTexts';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  boardLang: BoardLangType;
  boardType?: string | string[];
  menuId: number | undefined;
  isBookmarked: boolean;
  setLangModal: Dispatch<SetStateAction<boolean>>;
  onClickWrite: () => void;
};

const CommunityBoardTopNavi = ({
  boardTitle,
  boardLang,
  boardType,
  menuId,
  isBookmarked,
  setLangModal,
  onClickWrite,
}: CommunityBoardTopNaviPropType) => {
  const router = useRouter();
  const userId = getCookie('user_id');
  const urlLang = useUrlLanguage();
  const texts = communityBoardTexts[urlLang];
  const isBestBoard = Number(router.query.boardIndex) === 2291;

  const { useAddBookmark, useRemoveBookmark } = useBookmarkOnClick();

  const handleBookmarkOnClick = async (menuId: number) => {
    if (isBookmarked) {
      useRemoveBookmark.mutate({ identity: userId, menuId });
    } else {
      useAddBookmark.mutate({ identity: userId, menuId });
    }
  };
=======
import { ReactNode } from 'react';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  rightItem?: ReactNode;
};

const CommunityBoardTopNavi = ({ boardTitle, rightItem }: CommunityBoardTopNaviPropType) => {
  const router = useRouter();
>>>>>>> master

  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '10px',
        }}
      >
<<<<<<< HEAD
        <div
          css={{
            display: 'inline-flex',
            alignItems: 'center',
            '@media (max-width: 768px)': { maxWidth: '48%' },
          }}
        >
          {!boardType && (
            <IconArrowLeft
              iconCss={{ margin: '3px', width: '24px', height: '24px', cursor: 'pointer' }}
              onClickBack={() => router.back()}
            />
          )}
          <h1
            css={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.gray[1000],
              wordBreak: 'keep-all',
            }}
          >
            {boardTitle}
          </h1>
          <BookmarkButton
            isBookmarked={isBookmarked}
            width="24"
            height="24"
            onClick={() => handleBookmarkOnClick(Number(menuId))}
=======
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <IconArrowLeft
            iconCss={{ margin: '3px', width: '30px', height: '30px', cursor: 'pointer' }}
            onClickBack={() => router.back()}
>>>>>>> master
          />
          <h2>{boardTitle}</h2>
        </div>
        {rightItem}
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
