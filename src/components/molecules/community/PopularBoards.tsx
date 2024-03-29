import { useServerLang, useUrlLanguage } from '@/hooks/useLanguage';
import { useGetPopularBoardsQuery } from '@/server/useGetPopularBoardsQuery';
import { PopularBoardsSkeleton } from './CommunitySkeleton';
import PopularBoardItem from './PopularBoardItem';
import { Decreased, Increased, New, NoChange } from './PopularBoardRightItems';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';

const PopularBoards = () => {
  const urlLang = useUrlLanguage();
  const texts = communityLayoutTexts[urlLang];
  const serverLang = useServerLang();
  const { data, isFetching } = useGetPopularBoardsQuery(serverLang);

  return (
    <div
      css={{
        width: '230px',
        borderTop: '1px solid #d9d9d9',
      }}
    >
      <div
        css={{
          width: '100%',
          height: '40px',
          lineHeight: '40px',
          backgroundColor: '#FBFBFB',
          textAlign: 'center',
          color: '#101010',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        {texts.popularBoards + ' TOP 50'}
      </div>
      {isFetching && <PopularBoardsSkeleton />}
      {data?.map((boardItem, index) => {
        return (
          <PopularBoardItem
            key={'popularBoard' + index}
            rank={Number(boardItem.RANK)}
            boardName={boardItem.BOARD_TITLE}
            boardIndex={Number(boardItem.BOARD_IDX)}
            rightItem={getPopularBoardRightItem(boardItem.UP_DOWN)}
            isOpened={true}
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
