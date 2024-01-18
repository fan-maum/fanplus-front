import type { TopicListItemType } from '@/types/community';

type TopicTabBarPropType = {
  stringTopicAll: string;
  topicList: TopicListItemType[];
  topicIndex: number;
  onClickTopic: (topic: number) => void;
};

const CommunityBoardTopicTabBar = ({
  stringTopicAll,
  topicList,
  topicIndex,
  onClickTopic,
}: TopicTabBarPropType) => {
  return (
    <ul
      css={{
        width: 'calc(100% - 40px)',
        display: 'flex',
<<<<<<< HEAD
        width: '100%',
        height: '40px',
        flexDirection: 'row',
        alignItems: 'center',
=======
        margin: '8px 20px 10px',
        borderBottom: '1px solid #d9d9d9',
>>>>>>> master
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': { display: 'none' },
<<<<<<< HEAD
        '@media(max-width:768px)': {
          padding: '0 16px',
=======
        '@media (max-width: 768px)': {
          width: '100%',
          margin: '8px 0 10px',
>>>>>>> master
        },
      }}
    >
      <Topic title={stringTopicAll} selected={topicIndex === 0} onClick={() => onClickTopic(0)} />
      {topicList.length > 1 &&
        topicList.map((topic, idx) => {
          return (
            <Topic
              title={topic.NAME}
              selected={topicIndex === topic.IDX}
              onClick={() => onClickTopic(topic.IDX)}
              key={idx}
            />
          );
        })}
    </ul>
  );
};

export default CommunityBoardTopicTabBar;

const Topic = ({
  title,
  selected,
  onClick,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      css={{
        height: '40px',
        lineHeight: '37px',
        fontSize: '15px',
        fontWeight: '600',
        color: selected ? '#ff5656' : '#000',
        borderBottom: `${selected ? '2.5px solid #ff5656' : ''}`,
        textAlign: 'center',
        cursor: 'pointer',
        padding: '5px 8px',
        margin: '0px 2px',
      }}
      onClick={onClick}
    >
      {title}
    </li>
  );
};
