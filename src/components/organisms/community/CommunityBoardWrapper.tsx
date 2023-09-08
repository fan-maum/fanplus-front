import { BoardListItemType } from '@/types/community';
import CommunityBoardItem from '@/components/molecules/community/CommunityBoardItem';
import { setRecentBoardList } from '@/utils/recentBoard';

type CommunityBoardWrapperType = {
  title?: string;
  boardList: BoardListItemType[];
};

const CommunityBoardWrapper = ({ title, boardList }: CommunityBoardWrapperType) => {
  return (
    <section css={{ marginBottom: '30px' }}>
      {title && <h4 css={{ margin: '15px 5px' }}>{title}</h4>}
      {boardList.map((boardItem, idx) => {
        return (
          <CommunityBoardItem
            icon={boardItem.BOARD_ICON}
            title={boardItem.BOARD_TITLE}
            link={`/community/board/${boardItem.BOARD_IDX}/`}
            key={boardItem.BOARD_TITLE + idx}
            onClickLocalStore={() => setRecentBoardList(boardItem)}
          />
        );
      })}
    </section>
  );
};

export default CommunityBoardWrapper;
