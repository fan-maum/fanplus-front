import { BoardResultItemType } from '@/types/community';
import CommunityBoardItem from '@/components/molecules/community/CommunityBoardItem';
import { setRecentBoardList } from '@/utils/recentBoard';

type CommunityBoardWrapperType = {
  title?: string;
  boardList: BoardResultItemType[];
  activeTabState: string;
};

const CommunitySearchBoardWrapper = ({ title, boardList }: CommunityBoardWrapperType) => {
  return (
    <section css={{ marginBottom: '30px' }}>
      {title && <h4 css={{ margin: '15px 5px' }}>{title}</h4>}
      {boardList.length !== 0 ? (
        <>
          {boardList.map((boardItem) => {
            return (
              <CommunityBoardItem
                icon={boardItem.BOARD_ICON}
                title={boardItem.BOARD_TITLE}
                link={`/community/board/${boardItem.BOARD_IDX}/`}
                key={boardItem.BOARD_IDX}
                onClickLocalStore={() => setRecentBoardList(boardItem)}
              />
            );
          })}
        </>
      ) : (
        <p
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '30px 0',
            lineHeight: 1.5,
            fontSize: '22px',
            fontWeight: 600,
            color: '#666',
          }}
        >
          검색 결과가 없습니다.
          <br />
          연예인 명을 다시 한 번 확인해주세요.
        </p>
      )}
    </section>
  );
};

export default CommunitySearchBoardWrapper;
