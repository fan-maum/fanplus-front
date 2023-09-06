import { useRouter } from 'next/router';
import IconArrowLeft from '../atoms/IconArrowLeft';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import CommunityBoardLangSelector from './CommunityBoardLangSelector';

export type CommunityBoardTopNaviPropType = {
  backLink: string;
  boardTitle: string;
  langSelector?: ReactNode;
};

const CommunityBoardTopNavi = ({
  backLink,
  boardTitle,
  langSelector,
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
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <IconArrowLeft
            iconCss={{ margin: '3px', width: '30px', height: '30px', cursor: 'pointer' }}
            onClickBack={() => router.push(backLink)}
          />
          <h2>{boardTitle}</h2>
        </div>
        {langSelector}
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
