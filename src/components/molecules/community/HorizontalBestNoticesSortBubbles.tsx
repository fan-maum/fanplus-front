import type { CommunityBestNoticesTextType } from '@/types/textTypes';
import { Dispatch, SetStateAction } from 'react';
import type { BestPostsViewType } from './BestNotices';

const HorizontalBestNoticesSortBubbles = ({
  currentSortMode,
  setViewType,
  texts,
}: {
  currentSortMode: string;
  setViewType: Dispatch<SetStateAction<BestPostsViewType>>;
  texts: CommunityBestNoticesTextType;
}) => {
  const viewTypes: BestPostsViewType[] = ['daily', 'weekly', 'monthly', 'comment', 'recommend'];

  return (
    <div css={{ margin: '0 0 20px -3px' }}>
      {viewTypes.map((viewType, idx) => {
        return (
          <SortBubble
            key={'BestNoticesSortBubbles' + idx}
            text={texts[viewType]}
            viewType={viewType}
            currentMode={currentSortMode}
            onClick={() => {
              setViewType(viewType);
            }}
          />
        );
      })}
    </div>
  );
};

export default HorizontalBestNoticesSortBubbles;

const SortBubble = ({
  text,
  viewType,
  currentMode,
  onClick,
}: {
  text: string;
  viewType: string;
  currentMode: string;
  onClick: () => void;
}) => {
  return (
    <button
      css={{
        padding: '3px 6px',
        margin: '0 3px',
        fontSize: '14px',
        fontWeight: viewType === currentMode ? 600 : 400,
        color: viewType === currentMode ? '#ff5656' : '#101010',
        backgroundColor: viewType === currentMode ? '#ffedf1' : '#f1f1f1',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
