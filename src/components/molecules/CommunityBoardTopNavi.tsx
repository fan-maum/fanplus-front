import { useRouter } from 'next/router';
import IconArrowLeft from '../atoms/IconArrowLeft';
import IconFilter from '../atoms/IconFilter';
import { Dispatch, SetStateAction } from 'react';

export type CommunityBoardTopNaviPropType = {
  backLink: string;
  boardTitle: string;
  withLang: boolean;
  language: string;
  setLangModal: Dispatch<SetStateAction<boolean>>;
};

const CommunityBoardTopNavi = ({
  backLink,
  boardTitle,
  withLang,
  language,
  setLangModal,
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
        {withLang && (
          <div
            css={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setLangModal(true)}
          >
            <IconFilter />
            <span css={{ margin: '0px 5px' }}>{language}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default CommunityBoardTopNavi;
