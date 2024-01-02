import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { ReactNode } from 'react';
import { colors } from '@/styles/CommunityColors';
import BookmarkButton from '@/components/atoms/BookmarkButton';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  isBookmarked: boolean;
  rightItem?: ReactNode;
};

const CommunityBoardTopNavi = ({
  boardTitle,
  isBookmarked,
  rightItem,
}: CommunityBoardTopNaviPropType) => {
  const router = useRouter();

  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '10px',
          height: 40,
          marginTop: 20,
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <IconArrowLeft
            iconCss={{ margin: '3px', width: '24px', height: '24px', cursor: 'pointer' }}
            onClickBack={() => router.back()}
          />
          <h1
            css={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.gray[1000],
            }}
          >
            {boardTitle}
          </h1>
          <BookmarkButton isBookmarked={isBookmarked} width="24" height="24" />
        </div>
        {rightItem}
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
