import IconArrowDown from '@/components/atoms/IconArrowDown';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { useServerLang } from '@/hooks/useLanguage';
import { useGetPopularBoardsQuery } from '@/server/useGetPopularBoardsQuery';
import type { CommunityLayoutTextType } from '@/types/textTypes';
import { useEffect, useState } from 'react';
import PopularBoardItem from './PopularBoardItem';
import { getPopularBoardRightItem } from './PopularBoards';
import PopularBoardsRolling from './PopularBoardsRolling';

const PopularBoardsMobile = ({
  texts,
  initialOpen,
}: {
  texts: CommunityLayoutTextType;
  initialOpen: boolean;
}) => {
  const serverLang = useServerLang();

  const [page, setPage] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(initialOpen);
  }, [initialOpen]);

  const { data } = useGetPopularBoardsQuery(serverLang);
  const popularBoards = data?.RESULTS.DATAS.TOP_BOARDS;
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
        '@media (min-width: 768px)': { display: 'none' },
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
          position: 'relative',
          height: isOpened ? '205px' : '32px',
          overflow: 'hidden',
          transition: '0.3s ease-in-out',
        }}
      >
        {!isOpened && <PopularBoardsRolling popularBoards={popularBoards} />}
        {isOpened &&
          partialPopularBoards?.map((boardItem, index) => {
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
        {isOpened && (
          <Navigator
            page={page}
            texts={texts}
            onClickLeft={onClickLeft}
            onClickRight={onClickRight}
            onClickClose={onClickClose}
          />
        )}
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
        width: '100%',
        display: 'flex',
        position: 'absolute',
        bottom: '0px',
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
