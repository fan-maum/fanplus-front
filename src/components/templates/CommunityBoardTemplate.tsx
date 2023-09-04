import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  TopicListItemType,
} from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import CommunityBoardTopNavi from '../molecules/CommunityBoardTopNavi';
import CommunityBoardArticle from '../molecules/CommunityBoardArticle';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import IconWrite from '../atoms/IconWrite';
import IconPopularBlack from '../atoms/IconPopularBlack';
import IconMyPost from '../atoms/IconMyPost';
import IconPopular from '../atoms/IconPopular';

// TODO 1. 게시판 언어 선택 / 2. 각 게시글 실제 link 연결 (경은님과 함께 해야함) (하단 탭바 링크도 연결해야함.)

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
  const [viewType, setViewType] = useState((router.query.view as string) || 'all');

  useEffect(() => {
    setTopicIndex(parseInt(router.query.topic as string) || 0);
    setViewType((router.query.view as string) || 'all');
  }, [router.query]);

  const topicList = communityBoardTopics.RESULTS.DATAS.TOPIC_LIST;
  const postList = communityBoardData.RESULTS.DATAS.POST_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;

  const onClickWrite = () => router.push('/');
  const onClickPopular = () => {
    if (viewType !== 'best_post') {
      setViewType('best_post');
      router.push({
        pathname: router.pathname,
        query: { ...router.query, view: 'best_post', page: 1 },
      });
      return;
    }
    setViewType('all');
    router.push({ pathname: router.pathname, query: { ...router.query, view: 'all', page: 1 } });
  };
  const onClickMyPost = () => router.push('/');

  return (
    <div
      css={{
        width: '100%',
        maxWidth: '768px',
        margin: '0px auto',
        position: 'relative',
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
      <CommunityBoardPagination totalCount={parseInt(boardInfo.POST_CNT) || 200} />
      <BottomTabBar
        items={[
          { icon: <IconWrite />, title: texts.bottomTabBar.write, onClick: onClickWrite },
          {
            icon: viewType === 'best_post' ? <IconPopular /> : <IconPopularBlack />,
            title: texts.bottomTabBar.popular,
            onClick: onClickPopular,
          },
          { icon: <IconMyPost />, title: texts.bottomTabBar.myPost, onClick: onClickMyPost },
        ]}
      />
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

const BottomTabBar = ({ items }: { items: BottomTabBarItemPropType[] }) => {
  return (
    <>
      <div css={{ height: '60px' }}></div>
      <div
        css={{
          width: '100%',
          maxWidth: '768px',
          margin: '0px auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'fixed',
          bottom: '0px',
          zIndex: '200',
          backgroundColor: 'white',
          fontSize: '14px',
          borderTop: '1px solid #d9d9d9',
          svg: { width: '30px', height: '30px', margin: '2px' },
        }}
      >
        {items.map((item, idx) => {
          return (
            <BottomTabBarItem
              icon={item.icon}
              title={item.title}
              onClick={item.onClick}
              key={idx}
            />
          );
        })}
      </div>
    </>
  );
};

type BottomTabBarItemPropType = {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  selected?: boolean;
};
const BottomTabBarItem = ({ icon, title, onClick }: BottomTabBarItemPropType) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90px',
        margin: '3px 0px',
        textAlign: 'center',
      }}
      onClick={onClick}
    >
      {icon}
      {title}
    </div>
  );
};
