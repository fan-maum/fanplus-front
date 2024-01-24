import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import CommunityBoardTopNavi from '@/components/molecules/community/CommunityBoardTopNavi';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import type { BoardLangType } from '@/types/common';
import { setBoardLangCookie } from '@/utils/langCookie';
import CommunityLanguageModal from '@/components/modals/CommunityLanguageModal';
import CommunityCommonModal from '@/components/modals/CommunityCommonModal';
import { CommunityBoardPropTypes } from '@/pages/[locale]/community';
import { useQuery } from 'react-query';
import { getCommunityBoardData } from '@/api/Community';
import {
  CommunityBoardAllResponseType,
  CommunityBoardMyPostResponseType,
  CommunityBoardResponseType,
} from '@/types/community';
import CommunityBoardArticleTable from '../organisms/community/CommunityBoardArticleTable';
import DomainTopicContainer from '../organisms/community/DomainTopicContainer';
import CommunityBoardNoticeBanner from '../organisms/community/CommunityBoardNoticeBanner';

type CommunityBoardLayoutPropTypes = {
  communityBoardSSRdata:
    | CommunityBoardResponseType
    | CommunityBoardAllResponseType
    | CommunityBoardMyPostResponseType;
  boardType: string | number;
  boardTitle: string;
  communityBoardTopics?: any;
  communityNoticeBannerData?: any;
  children?: ReactNode;
};

const CommunityBoardLayout = ({
  queryParams,
  communityBoardSSRdata,
  initialProps,
  boardType,
  boardTitle,
  communityBoardTopics,
  communityNoticeBannerData,
  children,
}: CommunityBoardPropTypes & CommunityBoardLayoutPropTypes) => {
  const router = useRouter();
  const { urlLang, userId, isAdminAccount, boardLangCookie, maxPage } = queryParams;
  const texts = communityBoardTexts[urlLang];
  const serverLang = translateUrlLangToServerLang(urlLang);
  const page = Number(router.query.page) || 1;
  const topicIndex = Number(router.query.topic) || 0;
  const view_type = (router.query.view as string) || 'all';
  const noticeBannerList = communityNoticeBannerData?.RESULTS.DATAS.LIST;
  const isNoticeBannerExist = communityNoticeBannerData?.RESULTS.DATAS.COUNT !== 0;

  const [boardLang, setBoardLang] = useState(boardLangCookie);
  const [langModal, setLangModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);

  const isInitialData =
    initialProps.page === page &&
    initialProps.serverLang === serverLang &&
    initialProps.boardLangCookie === boardLang &&
    initialProps.view_type === view_type &&
    initialProps.topic === topicIndex;

  const { data: communityBoardDataCSR, isFetching } = useQuery(
    [
      'communityBoardData',
      { userId, boardType, page, serverLang, boardLang, view_type, topicIndex, maxPage },
    ],
    () =>
      getCommunityBoardData(
        userId,
        boardType,
        page,
        serverLang,
        boardLang,
        view_type,
        topicIndex,
        maxPage
      ),
    { initialData: isInitialData ? communityBoardSSRdata : undefined }
  );

  const communityBoardData = communityBoardDataCSR ?? communityBoardSSRdata;

  const onClickWrite = () => {
    const writeBanBoard = ['139', '192', '220'];
    const writeBanned = writeBanBoard.includes(
      communityBoardData?.BOARD_INFO.photocard_board_lang[0].BOARD_IDX as string
    );

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
      pathname: `/${urlLang}/community/board/${communityBoardData?.BOARD_INFO.photocard_board_lang[0].BOARD_IDX}/write`,
      query: { topic: router.query.topic },
    });
  };

  const onClickLanguageBox = async (language: BoardLangType) => {
    setBoardLang(language);
    setBoardLangCookie(language);
    router.replace({ query: { ...router.query, page: 1 } }, undefined, { shallow: true });
    setLangModal(false);
  };

  return (
    <>
      <div>
        <CommunityBoardTopNavi
          boardTitle={boardTitle}
          boardLang={boardLang}
          boardType={boardType}
          menuId={communityBoardData.BOARD_INFO.menuId}
          isBookmarked={communityBoardData.BOARD_INFO.isBookmarked}
          setLangModal={setLangModal}
          onClickWrite={onClickWrite}
        />
        {children}
        <DomainTopicContainer
          boardType={boardType}
          viewType={view_type}
          communityBoardTopics={communityBoardTopics}
          topicIndex={topicIndex}
          onClickWrite={onClickWrite}
        />
        {isNoticeBannerExist && <CommunityBoardNoticeBanner bannerList={noticeBannerList} />}
        <CommunityBoardArticleTable
          communityBoardData={communityBoardData}
          communityBoardSSRdata={communityBoardSSRdata}
          isFetching={isFetching}
          texts={texts}
          boardType={String(boardType)}
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
    </>
  );
};

export default CommunityBoardLayout;
