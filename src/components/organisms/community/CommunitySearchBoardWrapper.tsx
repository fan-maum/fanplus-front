import { BoardResultItemType } from '@/types/community';
import CommunityBoardItem from '@/components/molecules/community/CommunityBoardItem';
import { updateStorageRecentBoardList } from '@/utils/localStorage';
import { CommunityPageTextType } from '@/types/textTypes';

type CommunitySearchBoardWrapperProps = {
  title?: string;
  boardList: BoardResultItemType[];
  activeTabState: string;
  texts: CommunityPageTextType;
};

const CommunitySearchBoardWrapper = ({
  title,
  boardList,
  texts,
}: CommunitySearchBoardWrapperProps) => {
  return (
    <section css={{ margin: '12px 0 30px 0' }}>
      {title && <h4 css={{ margin: '15px 5px' }}>{title}</h4>}
      {boardList.length !== 0 ? (
        <>
          {boardList.map((boardItem) => {
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
          {texts.noResult[0]}
          <br />
          {texts.noResult[1]}
        </p>
      )}
    </section>
  );
};

export default CommunitySearchBoardWrapper;
