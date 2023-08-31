import { ListItemType } from '@/types/community';
import CommunityBoardItem from '../molecules/CommunityBoardItem';

type CommunityBoardWrapperType = {
  title?: string;
  boardList: ListItemType[];
};

const CommunityBoardWrapper = ({ title, boardList }: CommunityBoardWrapperType) => {
  return (
    <section css={{ marginBottom: '30px' }}>
      {title && <h4 css={{ margin: '15px 5px' }}>{title}</h4>}
      {boardList.map((boardItem, index) => {
        return (
          <CommunityBoardItem
            icon={boardItem.BOARD_ICON}
            title={boardItem.BOARD_TITLE}
            link="/"
            key={boardItem.BOARD_TITLE}
          />
        );
      })}
    </section>
  );
};

export default CommunityBoardWrapper;
