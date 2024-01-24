import { colors } from '@/styles/CommunityColors';
import type { TopicListItemType } from '@/types/community';

type TopicTabBarPropType = {
  stringTopicAll: string;
  topicList: TopicListItemType[] | undefined;
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
        display: 'flex',
        width: '100%',
        height: '40px',
        flexDirection: 'row',
        alignItems: 'center',
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': { display: 'none' },
        '@media(max-width:768px)': {
          padding: '0 16px',
        },
      }}
    >
      <Topic title={stringTopicAll} selected={topicIndex === 0} onClick={() => onClickTopic(0)} />
      {topicList &&
        topicList.length > 1 &&
        topicList?.map((topic, idx) => {
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
        fontSize: '14px',
        fontWeight: selected ? 600 : 400,
        color: selected ? colors.primary[500] : colors.gray[1000],
        cursor: 'pointer',
        padding: '5px 8px',
      }}
      onClick={onClick}
    >
      {title}
    </li>
  );
};
