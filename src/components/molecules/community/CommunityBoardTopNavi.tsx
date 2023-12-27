import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { ReactNode } from 'react';
import IconBookmark from '@/components/atoms/IconBookmark';
import { colors } from '@/styles/CommunityColors';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
  rightItem?: ReactNode;
};

const CommunityBoardTopNavi = ({ boardTitle, rightItem }: CommunityBoardTopNaviPropType) => {
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
          <h2
            css={{
              fontSize: '18px',
              fontWeight: 600,
              color: colors.gray[1000],
            }}
          >
            {boardTitle}
          </h2>
          <IconBookmark width="24" height="24" />
        </div>
        {rightItem}
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
