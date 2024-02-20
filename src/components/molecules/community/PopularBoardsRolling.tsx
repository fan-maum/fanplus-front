import type { PopularBoardItemType } from '@/types/community';
import { useInterval } from '@/hooks/useInterval';
import { useEffect, useState } from 'react';
import PopularBoardItem from './PopularBoardItem';
import { getPopularBoardRightItem } from './PopularBoards';

const PopularBoardsRolling = ({
  popularBoards,
}: {
  popularBoards: PopularBoardItemType[] | undefined;
}) => {
  const [rollingIndex, setRollingIndex] = useState(0);
  const interval = useInterval(() => setRollingIndex((prev) => (prev + 1) % 50), 3000);

  useEffect(() => {
    if (!!popularBoards) interval.start();
    return interval.stop;
  }, [popularBoards]);

  return (
    <div
      css={{
        flex: 1,
        transform: `translateY(${-40 * rollingIndex}px)`,
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
            isOpened={false}
          />
        );
      })}
    </div>
  );
};

export default PopularBoardsRolling;
