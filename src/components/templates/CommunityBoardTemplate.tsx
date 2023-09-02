import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  TopicListItemType,
} from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import CommunityBoardTopNavi from '../molecules/CommunityBoardTopNavi';
import CommunityBoardArticle from '../molecules/CommunityBoardArticle';

// TODO 1. 게시판 언어 선택 / 2. 각 게시글 실제 link 연결 (경은님과 함께 해야함)

export type CommunityBoardPropType = {
  communityBoardData: CommunityBoardResponseType;
  communityBoardTopics: CommunityBoardTopicResponseType;
  texts: CommunityBoardTextType;
};

const CommunityBoardTemplate = ({
  communityBoardData,
  communityBoardTopics,
  texts,
}: CommunityBoardPropType) => {
  const router = useRouter();

  const [topicIndex, setTopicIndex] = useState(parseInt(router.query.topic as string) || 0);

  const topicList = communityBoardTopics.RESULTS.DATAS.TOPIC_LIST;
  const postList = communityBoardData.RESULTS.DATAS.POST_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;

  return (
    <div
      css={{
        width: '100%',
        maxWidth: '480px',
        margin: '0px auto',
      }}
    >
      <CommunityBoardTopNavi boardTitle={boardInfo.BOARD_TITLE} />
      <TopicTabBar
        stringTopicAll={texts.all}
        topicList={topicList}
        topicIndex={topicIndex}
        setTopicIndex={setTopicIndex}
      />
      <ul>
        {postList.map((post, idx) => {
          return <CommunityBoardArticle postItem={post} link="/" key={idx} texts={texts} />;
        })}
      </ul>
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
    router.replace({ pathname: router.pathname, query: { ...router.query, topic: topicIndex } });
  };
  return (
    <ul
      css={{
        width: '100%',
        display: 'flex',
        margin: '8px 0px 16px',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
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
