import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
import { useMediaQuery } from 'react-responsive';
import { useRecoilState } from 'recoil';
import {
  boardLangState,
  isMobileState,
  openLanguageFitlerState,
  permissionModalState,
} from '@/store/community';

type CommunityBoardLayoutPropTypes = {
  communityBoardSSRdata:
    | CommunityBoardResponseType
    | CommunityBoardAllResponseType
    | CommunityBoardMyPostResponseType;
  boardType: string | number;
  boardTitle: string;
  communityBoardTopics?: any;
  communityNoticeBannerData?: any;
};

const CommunityBoardLayout = ({
  queryParams,
  communityBoardSSRdata,
  initialProps,
  boardType,
  boardTitle,
  communityBoardTopics,
  communityNoticeBannerData,
}: CommunityBoardPropTypes & CommunityBoardLayoutPropTypes) => {
  const router = useRouter();
  const { urlLang, userId, boardLangCookie, maxPage } = queryParams;
  const texts = communityBoardTexts[urlLang];
  const serverLang = translateUrlLangToServerLang(urlLang);
  const page = Number(router.query.page) || 1;
  const topicIndex = Number(router.query.topic) || 0;
  const view_type = (router.query.view as string) || 'all';
  const noticeBannerList = communityNoticeBannerData?.RESULTS.DATAS.LIST;
  const isNoticeBannerExist = communityNoticeBannerData?.RESULTS.DATAS.COUNT !== 0;

  const [boardLang, setBoardLang] = useRecoilState(boardLangState(boardLangCookie));
  const [langModal, setLangModal] = useRecoilState(openLanguageFitlerState);
  const [permissionModal, setPermissionModal] = useRecoilState(permissionModalState);

  /* mediaQuery 설정 */
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const mobile = useMediaQuery({ query: '(max-width:768px)' });

  useEffect(() => {
    if (mobile) setIsMobile(true);
    if (!mobile) setIsMobile(false);
  }, [mobile]);

  const isInitialData =
    initialProps.page === page &&
    initialProps.serverLang === serverLang &&
    initialProps.boardLangCookie === boardLang &&
    initialProps.view_type === view_type &&
    initialProps.topic === topicIndex;

  const perPage = 20;

  const { data: communityBoardDataCSR, isFetching } = useQuery(
    [
      'communityBoardData',
      { userId, boardType, page, perPage, serverLang, boardLang, view_type, topicIndex, maxPage },
    ],
    () =>
      getCommunityBoardData(
        userId,
        boardType,
        page,
        perPage,
        serverLang,
        boardLang,
        view_type,
        topicIndex,
        maxPage
      ),
    { initialData: isInitialData ? communityBoardSSRdata : undefined }
  );
  const communityBoardData = communityBoardDataCSR ?? communityBoardSSRdata;
  
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
          boardType={boardType}
          menuId={communityBoardData.BOARD_INFO.menuId}
        />
        <DomainTopicContainer
          isMobile={isMobile}
          boardType={boardType}
          viewType={view_type}
          boardLang={boardLang}
          communityBoardTopics={communityBoardTopics}
          topicIndex={topicIndex}
          setLangModal={setLangModal}
        />
        {isNoticeBannerExist && <CommunityBoardNoticeBanner bannerList={noticeBannerList} />}
        <CommunityBoardArticleTable
          communityBoardData={communityBoardData}
          communityBoardSSRdata={communityBoardSSRdata}
          isFetching={isFetching}
          texts={texts}
          boardType={String(boardType)}
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
