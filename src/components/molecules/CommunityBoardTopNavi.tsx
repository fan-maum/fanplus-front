import { useRouter } from 'next/router';
import IconArrowLeft from '../atoms/IconArrowLeft';

export type CommunityBoardTopNaviPropType = {
  boardTitle: string;
};

const CommunityBoardTopNavi = ({ boardTitle }: CommunityBoardTopNaviPropType) => {
  const router = useRouter();
  return (
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
          onClickBack={() => router.push('/community')}
        />
        <h2>{boardTitle}</h2>
      </div>
      <div>언어!</div>
    </div>
  );
};

export default CommunityBoardTopNavi;
