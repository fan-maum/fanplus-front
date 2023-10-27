import { BoardResultItemType } from '@/types/community';
import CommunityBoardItem from '@/components/molecules/community/CommunityBoardItem';
import { updateStorageRecentBoardList } from '@/utils/localStorage';
import { CommunityPageTextType } from '@/types/textTypes';

type CommunityBoardWrapperType = {
  title?: string;
  boardList?: BoardResultItemType[];
  activeTabState: string;
  texts: CommunityPageTextType;
};

const CommunitySearchBoardWrapper = ({ title, boardList, texts }: CommunityBoardWrapperType) => {
  return (
    <section css={{ marginBottom: '30px' }}>
      {title && <h4 css={{ margin: '15px 5px' }}>{title}</h4>}
      {boardList?.length !== 0 ? (
        <>
          {boardList?.map((boardItem) => {
            const postCount = Number(boardItem.POST_CNT).toLocaleString('en-US');
            return (
              <CommunityBoardItem
                icon={boardItem.BOARD_ICON}
                title={boardItem.BOARD_TITLE}
                link={`${texts.link.board}/${boardItem.BOARD_IDX}/`}
                postCount={texts.postCount + ' ' + postCount}
                key={boardItem.BOARD_IDX}
                onClickLocalStore={() => updateStorageRecentBoardList(boardItem)}
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
