import { BoardListItemType } from '@/types/community';
import CommunityBoardItem from '@/components/molecules/community/CommunityBoardItem';
import { updateStorageRecentBoardList } from '@/utils/recentBoard';
import { useUrlLanguage } from '@/hooks/useLanguage';

type CommunityBoardWrapperType = {
  title?: string;
  boardList: BoardListItemType[];
  postCountText: string;
};

const CommunityBoardWrapper = ({ title, boardList, postCountText }: CommunityBoardWrapperType) => {
  const pathLang = useUrlLanguage();
  return (
    <section css={{ marginBottom: '30px' }}>
      {title && <h4 css={{ margin: '15px 5px' }}>{title}</h4>}
      {boardList.map((boardItem, idx) => {
        const postCount = Number(boardItem.POST_CNT).toLocaleString('en-US');
        return (
          <CommunityBoardItem
            icon={boardItem.BOARD_ICON || boardItem.HEAD_IMG}
            title={boardItem.BOARD_TITLE}
            link={`/${pathLang}/community/board/${boardItem.BOARD_IDX}/`}
            postCount={postCountText + ' ' + postCount}
            key={boardItem.BOARD_TITLE + idx}
            onClickLocalStore={() => updateStorageRecentBoardList(boardItem)}
          />
        );
      })}
    </section>
  );
};

export default CommunityBoardWrapper;
