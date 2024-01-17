import CommunityBoardTopNavi from '@/components/molecules/community/CommunityBoardTopNavi';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import type { BoardLangType } from '@/types/common';
import { setBoardLangCookie } from '@/utils/langCookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CommunityLanguageModal from '@/components/modals/CommunityLanguageModal';
import CommunityCommonModal from '@/components/modals/CommunityCommonModal';
import { CommunityPropTypes } from '@/pages/[locale]/community';
import CommunityTypeBoardArticleTable from './CommunityTypeBoardArticleTable';
import { useQuery } from 'react-query';
import { getCommunityTypeBoardData } from '@/api/Community';

const CommunityMainBoard = ({
  urlLang,
  userId,
  boardLangCookie,
  communityMainBoardDataSSR,
  boardType,
  initialProps,
}: CommunityPropTypes & { boardType: string | string[] | undefined }) => {
  const router = useRouter();
  const texts = communityBoardTexts[urlLang];
  const page = Number(router.query.page) || 1;
  const topicIndex = Number(router.query.topic) || 0;
  const viewType = (router.query.view as string) || 'all';
  const boardIndex = Number(router.query.boardIndex);
  const maxPage = initialProps.maxPage;
  const requestLang = translateUrlLangToServerLang(urlLang);

  const [boardLang, setBoardLang] = useState(boardLangCookie);
  const [langModal, setLangModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);

  const isInitialData =
    initialProps.boardLangCookie === boardLang &&
    initialProps.page === page &&
    initialProps.serverLang === requestLang &&
    initialProps.view_type === viewType &&
    initialProps.maxPage === topicIndex;

  const { data: communityBoardDataCSR, isFetching } = useQuery(
    [
      'communityTypeBoardData',
      { userId, boardType, page, requestLang, boardLang, maxPage, viewType },
    ],
    () =>
      getCommunityTypeBoardData(
        userId,
        String(boardType),
        page,
        maxPage,
        requestLang,
        boardLang,
        viewType
      ),
    { initialData: isInitialData ? communityMainBoardDataSSR : undefined }
  );

  const communityBoardData = communityBoardDataCSR ?? communityMainBoardDataSSR;

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
          boardTitle={texts.bottomTabBar.all}
          boardLang={boardLang}
          boardType={boardType}
          menuId={communityBoardData.BOARD_INFO.menuId}
          isBookmarked={communityBoardData.BOARD_INFO.isBookmarked}
          setLangModal={setLangModal}
          onClickWrite={() => false}
        />
        <CommunityTypeBoardArticleTable
          communityBoardData={communityBoardData}
          communityBoardDataSSR={communityMainBoardDataSSR}
          isFetching={isFetching}
          texts={texts}
          boardType={String(boardType)}
          isStarBoardTableHeader
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

export default CommunityMainBoard;
