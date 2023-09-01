import {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  TopicListItemType,
} from '@/types/community';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type CommunityBoardPropType = {
  communityBoardData: CommunityBoardResponseType;
  communityBoardTopics: CommunityBoardTopicResponseType;
  stringTopicAll: string;
};

const CommunityBoardTemplate = ({
  communityBoardData,
  communityBoardTopics,
  stringTopicAll,
}: CommunityBoardPropType) => {
  const router = useRouter();

  const [topicIndex, setTopicIndex] = useState(parseInt(router.query.topic as string) || 0);
  // console.log(communityBoardData.RESULTS.DATAS.POST_LIST);

  const topicList = communityBoardTopics.RESULTS.DATAS.TOPIC_LIST;
  const postList = communityBoardData.RESULTS.DATAS.POST_LIST;

  return (
    <div
      css={{
        width: '100%',
        maxWidth: '400px',
        margin: '0px auto',
        backgroundColor: 'rgba(51,51,255,0.2)',
      }}
    >
      <TopicTabBar
        stringTopicAll={stringTopicAll}
        topicList={topicList}
        topicIndex={topicIndex}
        setTopicIndex={setTopicIndex}
      />
      {postList[0]?.WRITER_NAME}
    </div>
  );
};

export default CommunityBoardTemplate;

type TopicTabBarPropType = {
  stringTopicAll: string;
  topicList: TopicListItemType[];
  topicIndex: number;
  setTopicIndex: Dispatch<SetStateAction<number>>;
};

const TopicTabBar = ({
  stringTopicAll,
  topicList,
  topicIndex,
  setTopicIndex,
}: TopicTabBarPropType) => {
  const router = useRouter();
  const handleClick = (topicIndex: number) => {
    setTopicIndex(topicIndex);
    router.push({ pathname: router.pathname, query: { ...router.query, topic: topicIndex } });
  };
  return (
    <ul css={{ width: '100%', display: 'flex', margin: '8px 0px' }}>
      <Topic title={stringTopicAll} selected={topicIndex === 0} onClick={() => handleClick(0)} />
      {topicList.map((topic, idx) => {
        return (
          <Topic
            title={topic.NAME}
            selected={topicIndex === topic.IDX}
            onClick={() => handleClick(topic.IDX)}
            key={idx}
          />
        );
      })}
    </ul>
  );
};

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
        borderBottom: `2.5px solid ${selected ? '#ff5656' : '#d9d9d9'}`,
        textAlign: 'center',
        cursor: 'pointer',
        padding: '5px 8px',
        margin: '2px',
      }}
      onClick={onClick}
    >
      {title}
    </li>
  );
};
