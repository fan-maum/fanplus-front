import { BoardResultItemType } from '@/types/community';
import CommunityBoardItem from '@/components/molecules/community/CommunityBoardItem';

type CommunityBoardWrapperType = {
  title?: string;
  boardList: BoardResultItemType[];
  activeTabState: string;
};

const CommunitySearchBoardWrapper = ({ title, boardList }: CommunityBoardWrapperType) => {
  return (
    <section css={{ marginBottom: '30px' }}>
      {title && <h4 css={{ margin: '15px 5px' }}>{title}</h4>}
      {boardList.map((boardItem) => {
        return (
          <CommunityBoardItem
            icon={boardItem.HEAD_IMG}
            title={boardItem.BOARD_TITLE}
            link={`/community/board/${boardItem.BOARD_IDX}/`}
            key={boardItem.BOARD_IDX}
          />
        );
      })}
    </section>
  );
};

export default CommunitySearchBoardWrapper;
