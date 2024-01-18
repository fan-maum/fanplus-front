import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { CommunityBoardPropType } from '@/pages/[locale]/community/board/[boardIndex]';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import type { BoardLangType } from '@/types/common';
import { setBoardLangCookie } from '@/utils/langCookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import IconMyPost from '../atoms/IconMyPost';
import IconPopular from '../atoms/IconPopular';
import IconPopularBlack from '../atoms/IconPopularBlack';
import IconWrite from '../atoms/IconWrite';
import CommunityCommonModal from '../modals/CommunityCommonModal';
import CommunityLanguageModal from '../modals/CommunityLanguageModal';
import CommunityBoardLangSelector from '../molecules/community/CommunityBoardLangSelector';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardArticleTable from '../organisms/community/CommunityBoardArticleTable';
import CommunityBoardBottomTabBar from '../organisms/community/CommunityBoardBottomTabBar';
import CommunityBoardNoticeBanner from '../organisms/community/CommunityBoardNoticeBanner';
import CommunityBoardTopicTabBar from '../organisms/community/CommunityBoardTopicTabBar';
<<<<<<< HEAD
import { colors } from '@/styles/CommunityColors';
import BoardDomains from '../organisms/community/BoardDomains';
import { useQuery } from 'react-query';
import { getCommunityBoardData } from '@/api/Community';
import { CommunityBoardResponseType } from '@/types/community';
=======
import CommunityLayout from './CommunityLayout';
>>>>>>> master

const CommunityBoardTemplate = ({
  urlLang,
  userId,
  isAdminAccount,
  boardLangCookie,
  communityBoardDataSSR,
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

<<<<<<< HEAD
  const topicList = communityBoardTopics?.RESULTS.DATAS.TOPIC_LIST;
  const noticeBannerList = communityNoticeBannerData?.RESULTS.DATAS.LIST;
  const isNoticeBannerExist = communityNoticeBannerData?.RESULTS.DATAS.COUNT !== 0;
=======
  const topicList = communityBoardTopics.RESULTS.DATAS.TOPIC_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;
  const noticeBannerList = communityNoticeBannerData.RESULTS.DATAS.LIST;

  const isNoticeBannerExist = communityNoticeBannerData.RESULTS.DATAS.COUNT !== 0;
>>>>>>> master
  const isInitialData =
    initialProps.boardLangCookie === boardLang &&
    initialProps.page === page &&
    initialProps.serverLang === requestLang &&
    initialProps.view_type === viewType &&
    initialProps.topic === topicIndex;

  const isBestBoard = boardIndex === 2291;

  const currentBoardIndex = isBestBoard ? 2291 : Number(router.query.boardIndex);

  const { data: communityBoardDataCSR, isFetching } = useQuery(
    [
      'communityBoardData',
      { userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType },
    ],
    () =>
      getCommunityBoardData(
        userId,
        currentBoardIndex,
        page,
        requestLang,
        boardLang,
        topicIndex,
        viewType
      ),
    { initialData: isInitialData ? communityBoardDataSSR : undefined }
  );

  const communityBoardData: CommunityBoardResponseType =
    communityBoardDataCSR ?? communityBoardDataSSR;

  const onClickWrite = () => {
    const writeBanBoard = ['139', '192', '220'];
<<<<<<< HEAD
    const writeBanned = writeBanBoard.includes(
      communityBoardData?.BOARD_INFO.photocard_board_lang[0].BOARD_IDX as string
    );
=======
    const writeBanned = writeBanBoard.includes(boardInfo.BOARD_IDX as string);
>>>>>>> master
    if (writeBanned && !isAdminAccount) {
      setPermissionModal(true);
      return;
    }
    if (!userId) {
      const path = router.asPath;
      router.push({ pathname: '/login', query: { nextUrl: path } });
      return;
    }
    router.push({
<<<<<<< HEAD
      pathname: `/${urlLang}/community/board/${communityBoardData?.BOARD_INFO.photocard_board_lang[0].BOARD_IDX}/write`,
=======
      pathname: `/${urlLang}/community/board/${boardInfo.BOARD_IDX}/write`,
>>>>>>> master
      query: { topic: router.query.topic },
    });
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
    <CommunityLayout>
      <div
        css={{
          width: '100%',
          maxWidth: '768px',
          margin: '0px auto',
          position: 'relative',
        }}
      >
        <CommunityBoardTopNavi
<<<<<<< HEAD
          boardTitle={communityBoardData?.BOARD_INFO.photocard_board_lang[0].TITLE as string}
          boardLang={boardLang}
          menuId={communityBoardData?.BOARD_INFO.menuId}
          isBookmarked={communityBoardData.BOARD_INFO.isBookmarked}
          setLangModal={setLangModal}
          onClickWrite={onClickWrite}
        />
        {!isBestBoard && (
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 0,
              height: 80,
            }}
          >
            <div
              css={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '40px',
                padding: '6px 0',
                borderTop: `1px solid ${colors.gray[100]}`,
                borderBottom: `1px solid ${colors.gray[100]}`,
                '@media(max-width:768px)': {
                  padding: '0 16px',
                },
              }}
            >
              <BoardDomains viewType={viewType} boardDomainTexts={texts.bottomTabBar} />
              <button
                css={{
                  padding: '5px 8px',
                  fontSize: 14,
                  fontWeight: 600,
                  outline: 'none',
                  border: 'none',
                  color: '#fff',
                  backgroundColor: colors.primary[500],
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'none',
                  '@media(max-width:768px)': { display: 'flex' },
                }}
                onClick={onClickWrite}
              >
                {texts.bottomTabBar.write}
              </button>
            </div>
            <CommunityBoardTopicTabBar
              stringTopicAll={texts.all}
              topicList={topicList}
              topicIndex={topicIndex}
              onClickTopic={onClickTopic}
            />
          </div>
=======
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
        {!isBestBoard && (
          <CommunityBoardTopicTabBar
            stringTopicAll={texts.all}
            topicList={topicList}
            topicIndex={topicIndex}
            onClickTopic={onClickTopic}
          />
>>>>>>> master
        )}
        {isNoticeBannerExist && <CommunityBoardNoticeBanner bannerList={noticeBannerList} />}
        <CommunityBoardArticleTable
          communityBoardData={communityBoardData}
          communityBoardDataSSR={communityBoardDataSSR}
          isFetching={isFetching}
          texts={texts}
          onClickWrite={onClickWrite}
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
      {!isBestBoard && (
        <CommunityBoardBottomTabBar
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
      )}
    </CommunityLayout>
  );
};

export default CommunityBoardTemplate;
