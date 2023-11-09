import { TopBoardItemType } from '@/types/community';
import { useInterval } from '@/hooks/useInterval';
import { useEffect, useState } from 'react';
import PopularBoardItem from './PopularBoardItem';
import { getPopularBoardRightItem } from './PopularBoards';

const PopularBoardsRolling = ({
  popularBoards,
}: {
  popularBoards: TopBoardItemType[] | undefined;
}) => {
  const [rollingIndex, setRollingIndex] = useState(0);
  const interval = useInterval(() => setRollingIndex((prev) => (prev + 1) % 30), 3000);

  useEffect(() => {
    if (!!popularBoards) interval.start();
    return interval.stop;
  }, [popularBoards]);

  return (
    <div
      css={{
        transform: `translateY(${-33 * rollingIndex}px)`,
        transition: '0.5s',
      }}
    >
      {popularBoards?.map((boardItem, index) => {
        return (
          <PopularBoardItem
            key={'rollingPopularBoard' + index}
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

export default PopularBoardsRolling;
