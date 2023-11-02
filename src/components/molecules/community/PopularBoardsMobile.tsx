import IconArrowDown from '@/components/atoms/IconArrowDown';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import type { CommunityLayoutTextType } from '@/types/textTypes';
import { useState } from 'react';
import PopularBoardItem from './PopularBoardItem';
import { Decreased, Increased, New, NoChange } from './PopularBoardRightItems';
import { translateUrlLangToServerLang, useUrlLanguage } from '@/hooks/useLanguage';
import { useQuery } from 'react-query';
import { getTop30 } from '@/api/Community';
import { getPopularBoardRightItem } from './PopularBoards';

const PopularBoardsMobile = ({ texts }: { texts: CommunityLayoutTextType }) => {
  const lang = useUrlLanguage();
  const serverLang = translateUrlLangToServerLang(lang);

  const [page, setPage] = useState(0);
  const [isOpened, setIsOpened] = useState(true);

  const { data: popularBoardResponse } = useQuery({
    queryKey: 'Top30 Popular Boards',
    queryFn: () => getTop30(serverLang),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });

  const popularBoards = popularBoardResponse?.RESULTS.DATAS.TOP_BOARDS;
  const partialPopularBoards = popularBoards?.slice(page * 5, page * 5 + 5);

  const onClickLeft = () => {
    setPage((prev) => prev - 1);
  };
  const onClickRight = () => {
    setPage((prev) => prev + 1);
  };
  const onClickIcon = () => {
    if (isOpened) {
      setPage(0);
    }
    setIsOpened((prev) => !prev);
  };
  const onClickClose = () => {
    setPage(0);
    setIsOpened(false);
  };

  return (
    <div
      css={{
        width: 'calc(100% - 32px)',
        border: '1px solid #d9d9d9',
        margin: '0 16px',
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '40px',
          padding: '0 20px 0 16px',
          lineHeight: '40px',
          backgroundColor: '#f8f8f9',
          textAlign: 'center',
          color: '#101010',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        {texts.popularBoards + ' TOP 30'}
        <IconArrowDown width="12px" onClick={onClickIcon} isReverse={isOpened} />
      </div>
      <div
        css={{
          height: isOpened ? '205px' : '32px',
          overflow: 'hidden',
          transition: '0.3s ease-in-out',
        }}
      >
        {partialPopularBoards?.map((boardItem, index) => {
          return (
            <PopularBoardItem
              key={'popularBoard' + index}
              rank={Number(boardItem.RANK)}
              boardName={boardItem.BOARD_TITLE}
              boardIndex={Number(boardItem.BOARD_IDX)}
              rightItem={getPopularBoardRightItem(boardItem.UP_DOWN)}
            />
          );
        })}
        <Navigator
          page={page}
          texts={texts}
          onClickLeft={onClickLeft}
          onClickRight={onClickRight}
          onClickClose={onClickClose}
        />
      </div>
    </div>
  );
};

export default PopularBoardsMobile;

/**
 *
 * * 모바일 전용 하위 컴포넌트
 */

const Navigator = ({
  page,
  texts,
  onClickLeft,
  onClickRight,
  onClickClose,
}: {
  page: number;
  texts: CommunityLayoutTextType;
  onClickLeft: () => void;
  onClickRight: () => void;
  onClickClose: () => void;
}) => {
  return (
    <div
      css={{
        display: 'flex',
        height: '40px',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
      }}
    >
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <LeftButton onClick={onClickLeft} inActive={page === 0} />
        <RightButton onClick={onClickRight} inActive={page === 5} />
      </div>
      <CloseButton text={texts.close} onClick={onClickClose} />
    </div>
  );
};

const LeftButton = ({
  onClick,
  isReverse,
  inActive,
}: {
  onClick: () => void;
  isReverse?: boolean;
  inActive?: boolean;
}) => {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #d9d9d9',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        transform: isReverse ? 'scaleX(-1)' : '',
        marginRight: '10px',
        backgroundColor: inActive ? '#f2f4f5' : '#fff',
        ':active': { backgroundColor: '#f2f4f5' },
      }}
      onClick={inActive ? undefined : onClick}
    >
      <IconArrowLeft
        iconCss={{ width: '18px', marginRight: '2px', path: { stroke: '#666 !important' } }}
      />
    </div>
  );
};

const RightButton = ({ onClick, inActive }: { onClick: () => void; inActive?: boolean }) => {
  return <LeftButton onClick={onClick} inActive={inActive} isReverse />;
};

const CloseButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      css={{
        padding: '2px 8px',
        lineHeight: '18px',
        border: '1px solid #d9d9d9',
        backgroundColor: '#fff',
        color: '#101010',
        fontSize: '14px',
        fontWeight: '600',
        borderRadius: '6px',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
