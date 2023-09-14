import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityNoticeBannerResponseType,
  TopicListItemType,
} from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import type { BoardLangType } from '@/types/common';
import { useRouter } from 'next/router';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import IconWrite from '../atoms/IconWrite';
import IconPopularBlack from '../atoms/IconPopularBlack';
import IconMyPost from '../atoms/IconMyPost';
import IconPopular from '../atoms/IconPopular';
import CommunityLanguageModal from '../modals/CommunityLanguageModal';
import CommunityBoardNoPost from '../organisms/community/CommunityBoardNoPost';
import CommunityBoardLangSelector from '../molecules/community/CommunityBoardLangSelector';
import CommunityBoardNoticeBanner from '../organisms/community/CommunityBoardNoticeBanner';

// TODO 1. 각 게시글 실제 link 연결 (경은님과 함께 해야함) (하단 탭바의 글쓰기 링크도 연결해야함)

export type CommunityBoardPropType = {
  communityBoardData: CommunityBoardResponseType;
  communityBoardTopics: CommunityBoardTopicResponseType;
  communityNoticeBannerData: CommunityNoticeBannerResponseType;
  texts: CommunityBoardTextType;
};

const CommunityBoardTemplate = ({
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
  texts,
}: CommunityBoardPropType) => {
  const router = useRouter();

  const [topicIndex, setTopicIndex] = useState(parseInt(router.query.topic as string) || 0);
  const [viewType, setViewType] = useState((router.query.view as string) || 'all');
  const [boardLang, setBoardLang] = useState((router.query.boardLang as BoardLangType) || 'ALL');
  const [langModal, setLangModal] = useState(false);

  const topicList = communityBoardTopics.RESULTS.DATAS.TOPIC_LIST;
  const postList = communityBoardData.RESULTS.DATAS.POST_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;
  const noticeBannerList = communityNoticeBannerData.RESULTS.DATAS.LIST;

  const isPostExist = boardInfo.POST_CNT !== 0;
  const isNoticeBannerExist = communityNoticeBannerData.RESULTS.DATAS.COUNT !== 0;

  const onClickWrite = () => router.push('/');
  const onClickPopular = () => {
    if (viewType !== 'best_post') {
      setViewType('best_post');
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, view: 'best_post', page: 1 },
      });
      return;
    }
    setViewType('all');
    router.replace({ pathname: router.pathname, query: { ...router.query, view: 'all', page: 1 } });
  };
  const onClickMyPost = () => router.push(`/community/board/${boardInfo.BOARD_IDX}/mypost`);

  return (
    <div
      css={{
        width: '100%',
        maxWidth: '768px',
        margin: '0px auto',
        position: 'relative',
      }}
    >
      <CommunityBoardTopNavi
        boardTitle={boardInfo.BOARD_TITLE}
        rightItem={
          <CommunityBoardLangSelector
            language={texts.boardLang[boardLang]}
            onClick={() => setLangModal(true)}
          />
        }
      />
      <TopicTabBar
        stringTopicAll={texts.all}
        topicList={topicList}
        topicIndex={topicIndex}
        setTopicIndex={setTopicIndex}
      />
      {isNoticeBannerExist && <CommunityBoardNoticeBanner bannerList={noticeBannerList} />}
      {isPostExist ? (
        <>
          <ul>
            {postList.map((post, idx) => {
              return (
                <CommunityBoardArticle
                  postItem={post}
                  link={`/community/board/${boardInfo.BOARD_IDX}/${post.POST_IDX}`}
                  key={idx}
                  texts={texts}
                />
              );
            })}
          </ul>
          <CommunityBoardPagination totalCount={boardInfo.POST_CNT} />
        </>
      ) : (
        <CommunityBoardNoPost
          onClickWrite={onClickWrite}
          buttonText={texts.buttonWrite}
          texts={texts.noPostTexts}
        />
      )}
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
      <CommunityLanguageModal
        texts={texts.boardLang}
        opened={langModal}
        setModal={setLangModal}
        boardLang={boardLang}
        setBoardLanguage={setBoardLang}
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
    router.replace({ pathname: router.pathname, query: { ...router.query, topic: topicIndex } });
  };
  return (
    <ul
      css={{
        width: '100%',
        display: 'flex',
        margin: '8px 0px 16px',
        borderBottom: '1px solid #d9d9d9',
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': { display: 'none' },
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

type BottomTabBarItemPropType = {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  selected?: boolean;
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
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {icon}
      {title}
    </div>
  );
};
