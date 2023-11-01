import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { CommunityBoardPropType } from '@/pages/[locale]/community/board/[boardIndex]';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import type { BoardLangType } from '@/types/common';
import type { TopicListItemType } from '@/types/community';
import { setBoardLangCookie } from '@/utils/langCookie';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import IconMyPost from '../atoms/IconMyPost';
import IconPopular from '../atoms/IconPopular';
import IconPopularBlack from '../atoms/IconPopularBlack';
import IconWrite from '../atoms/IconWrite';
import CommunityCommonModal from '../modals/CommunityCommonModal';
import CommunityLanguageModal from '../modals/CommunityLanguageModal';
import CommunityBoardLangSelector from '../molecules/community/CommunityBoardLangSelector';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardArticleMain from '../organisms/community/CommunityBoardArticleMain';
import CommunityBoardNoticeBanner from '../organisms/community/CommunityBoardNoticeBanner';

const CommunityBoardTemplate = ({
  urlLang,
  userId,
  boardLangCookie,
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
  initialProps,
}: CommunityBoardPropType) => {
  const router = useRouter();
  const texts = communityBoardTexts[urlLang];

  const page = Number(router.query.page) - 1 || 0;
  const topicIndex = Number(router.query.topic) || 0;
  const viewType = (router.query.view as string) || 'all';
  const boardIndex = Number(router.query.boardIndex);
  const requestLang = translateUrlLangToServerLang(urlLang);

  const [boardLang, setBoardLang] = useState(boardLangCookie);
  const [langModal, setLangModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);

  const topicList = communityBoardTopics.RESULTS.DATAS.TOPIC_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;
  const noticeBannerList = communityNoticeBannerData.RESULTS.DATAS.LIST;

  const isNoticeBannerExist = communityNoticeBannerData.RESULTS.DATAS.COUNT !== 0;
  const isInitialData =
    initialProps.boardLangCookie === boardLang &&
    initialProps.page === page &&
    initialProps.serverLang === requestLang &&
    initialProps.viewType === viewType &&
    initialProps.topic === topicIndex;

  const onClickWrite = () => {
    const writeBanBoard = ['139', '192', '220'];
    const writeBanned = writeBanBoard.includes(boardInfo.BOARD_IDX as string);
    if (writeBanned) {
      setPermissionModal(true);
      return;
    }
    if (!userId) {
      const path = router.asPath;
      router.push({ pathname: '/login', query: { nextUrl: path } });
      return;
    }
    router.push(`/${urlLang}/community/board/${boardInfo.BOARD_IDX}/write`);
  };
  const onClickPopular = async () => {
    if (viewType !== 'best_post') {
      router.replace({ query: { ...router.query, view: 'best_post', page: 1 } }, undefined, {
        shallow: true,
      });
      return;
    }
    router.replace({ query: { ...router.query, view: 'all', page: 1 } }, undefined, {
      shallow: true,
    });
  };
  const onClickMyPost = () => {
    if (!userId) {
      const path = router.asPath;
      router.push({ pathname: '/login', query: { nextUrl: path } });
      return;
    }
    router.push(`/community/board/${boardInfo.BOARD_IDX}/mypost`);
  };
  const onClickTopic = async (topic: number) => {
    router.replace(
      { pathname: router.pathname, query: { ...router.query, topic, page: 1 } },
      undefined,
      { shallow: true }
    );
  };
  const onClickLanguageBox = async (language: BoardLangType) => {
    setBoardLang(language);
    setBoardLangCookie(language);
    router.replace({ query: { ...router.query, page: 1 } }, undefined, { shallow: true });
    setLangModal(false);
  };

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
        boardTitle={boardInfo.BOARD_TITLE as string}
        rightItem={
          <CommunityBoardLangSelector
            language={texts.boardLang[boardLang]}
            onClickOpenModal={() => setLangModal(true)}
            tooltipText={texts.langSelectorToolTip}
            boardLang={boardLang}
          />
        }
      />
      <TopicTabBar
        stringTopicAll={texts.all}
        topicList={topicList}
        topicIndex={topicIndex}
        onClickTopic={onClickTopic}
      />
      {isNoticeBannerExist && <CommunityBoardNoticeBanner bannerList={noticeBannerList} />}
      <CommunityBoardArticleMain
        communityBoardDataSSR={communityBoardData}
        texts={texts}
        queries={{ userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType }}
        isInitialData={isInitialData}
        onClickWrite={onClickWrite}
      />
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
        onClickLanguageBox={onClickLanguageBox}
      />
      <CommunityCommonModal
        opened={permissionModal}
        onClose={() => setPermissionModal(false)}
        confirmButton={{
          onClick: () => setPermissionModal(false),
          text: texts.permissionModal.check,
        }}
      >
        {texts.permissionModal.noPermission}
      </CommunityCommonModal>
    </div>
  );
};

export default CommunityBoardTemplate;

type TopicTabBarPropType = {
  stringTopicAll: string;
  topicList: TopicListItemType[];
  topicIndex: number;
  onClickTopic: (topic: number) => void;
};

const TopicTabBar = ({
  stringTopicAll,
  topicList,
  topicIndex,
  onClickTopic,
}: TopicTabBarPropType) => {
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
type BottomTabBarPropType = BottomTabBarItemPropType[];

const BottomTabBar = ({ items }: { items: BottomTabBarPropType }) => {
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
        flex: '1 1 30%',
        whiteSpace: 'nowrap',
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
