import PopularBoardItem from './PopularBoardItem';
import { Decreased, Increased, New, NoChange } from './PopularBoardRightItems';
import { useQuery } from 'react-query';
import { getTop30 } from '@/api/Community';
import { translateUrlLangToServerLang, useUrlLanguage } from '@/hooks/useLanguage';

const PopularBoards = ({ title }: { title: string }) => {
  const lang = useUrlLanguage();
  const serverLang = translateUrlLangToServerLang(lang);
  const { data: popularBoardResponse } = useQuery({
    queryKey: 'Top30 Popular Boards',
    queryFn: () => getTop30(serverLang),
    staleTime: 1000 * 60 * 30,
    cacheTime: 100 * 60 * 60,
  });

  return (
    <div
      css={{
        width: '230px',
        border: '1px solid #d9d9d9',
        borderBottom: 'none',
        position: 'absolute',
        left: 'calc((100% - 768px)/2 - 250px)',
      }}
    >
      <div
        css={{
          width: '100%',
          height: '40px',
          lineHeight: '40px',
          backgroundColor: '#f8f8f9',
          textAlign: 'center',
          color: '#101010',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        {title}
      </div>
      {popularBoardResponse?.RESULTS.DATAS.TOP_BOARDS.map((boardItem, index) => {
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
    </div>
  );
};

export default PopularBoards;

export const getPopularBoardRightItem = (upDown: string | number) => {
  const rankChange = Number(upDown);
  if (upDown === 'NEW') return <New />;
  if (rankChange > 0) return <Increased rankChange={Math.abs(rankChange)} />;
  if (rankChange < 0) return <Decreased rankChange={Math.abs(rankChange)} />;
  return <NoChange />;
};
