import { useRouter } from 'next/router';
import IconArrowLeft from '../atoms/IconArrowLeft';
import { ReactNode } from 'react';

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
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <IconArrowLeft
            iconCss={{ margin: '3px', width: '30px', height: '30px', cursor: 'pointer' }}
            onClickBack={() => router.back()}
          />
          <h2>{boardTitle}</h2>
        </div>
        {rightItem}
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
