import IconCheck from '@/components/atoms/IconCheck';
import { TopicListItemType } from '@/types/community';
import { Dispatch, SetStateAction } from 'react';

const EditorTopicSet = ({
  topics,
  topicIdx,
  setTopicIdx,
}: {
  topics: TopicListItemType[];
  topicIdx: number;
  setTopicIdx: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div
      css={{
        display: 'flex',
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        '::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {topics.map((topic, idx) => {
        return (
          <EditorTopicBubble
            key={idx}
            selected={topic.IDX === topicIdx}
            topicData={topic}
            onClick={() => setTopicIdx(topic.IDX)}
          />
        );
      })}
    </div>
  );
};

const EditorTopicBubble = ({
  selected,
  topicData,
  onClick,
}: {
  selected?: boolean;
  topicData: TopicListItemType;
  onClick: () => void;
}) => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: selected ? '#ff5656' : 'transparent',
        color: selected ? '#fff' : '#666',
        marginRight: '5px',
        padding: '0px 10px',
        height: '32px',
        borderRadius: '16px',
        cursor: 'pointer',
        p: { fontWeight: 500, fontSize: '18px' },
        svg: { marginRight: '5px' },
      }}
      onClick={onClick}
    >
      {selected && <IconCheck height="10" />}
      <p>{topicData.NAME}</p>
    </div>
  );
};

export default EditorTopicSet;
