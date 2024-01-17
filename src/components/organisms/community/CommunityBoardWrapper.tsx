import CommunityBoardTopNavi from '@/components/molecules/community/CommunityBoardTopNavi';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import { setBoardLangCookie } from '@/utils/langCookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CommunityLanguageModal from '@/components/modals/CommunityLanguageModal';
import CommunityCommonModal from '@/components/modals/CommunityCommonModal';
import { CommunityBoardResponseType } from '@/types/community';
import CommunityBoardArticleTable from './CommunityBoardArticleTable';
import { useQuery } from 'react-query';
import { getCommunityBoardData } from '@/api/Community';

type CommunityBoardWrapperProps = {
  urlLang: UrlLangType;
  userId: string;
  boardTitle: string;
  boardType: string;
  isAdminAccount: boolean;
  boardLangCookie: BoardLangType;
  communityBoardDataSSR: CommunityBoardResponseType;
  initialProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    topic: number;
    view_type: string;
  };
};

const CommunityBoardWrapper = ({
  urlLang,
  userId,
  boardTitle,
  boardType,
  isAdminAccount,
  boardLangCookie,
  communityBoardDataSSR,
  initialProps,
}: CommunityBoardWrapperProps) => {
  const router = useRouter();
  const texts = communityBoardTexts[urlLang];
  const page = Number(router.query.page) || 1;
  const topicIndex = Number(router.query.topic) || 0;
  const viewType = (router.query.view as string) || 'all';
  const boardIndex = Number(router.query.boardIndex);
  const requestLang = translateUrlLangToServerLang(urlLang);

  const [boardLang, setBoardLang] = useState(boardLangCookie);
  const [langModal, setLangModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);

  const isInitialData =
    initialProps.boardLangCookie === boardLang &&
    initialProps.page === page &&
    initialProps.serverLang === requestLang &&
    initialProps.view_type === viewType &&
    initialProps.topic === topicIndex;

  const onClickLanguageBox = async (language: BoardLangType) => {
    setBoardLang(language);
    setBoardLangCookie(language);
    router.replace({ query: { ...router.query, page: 1 } }, undefined, { shallow: true });
    setLangModal(false);
  };

  const isBestBoard = boardIndex === 2291 || String(router.query.boardType) === '2291';
  const currentBoardIndex = isBestBoard ? 2291 : Number(router.query.boardIndex);

  const { data: communityBoardDataCSR, isFetching } = useQuery(
    [
      'communityBoardData',
      { userId, boardIndex: currentBoardIndex, page, requestLang, boardLang, topicIndex, viewType },
    ],
    () => getCommunityBoardData(userId, 2291, page, requestLang, boardLang, topicIndex, viewType),
    { initialData: isInitialData ? communityBoardDataSSR : undefined }
  );

  const communityBoardData: CommunityBoardResponseType =
    communityBoardDataCSR ?? communityBoardDataSSR;

  return (
    <>
      <div>
        <CommunityBoardTopNavi
          boardTitle={boardTitle}
          boardLang={boardLang}
          boardType={boardType}
          menuId={communityBoardDataSSR.BOARD_INFO.menuId}
          isBookmarked={communityBoardDataSSR.BOARD_INFO.isBookmarked}
          setLangModal={setLangModal}
          onClickWrite={() => false}
        />
        <CommunityBoardArticleTable
          communityBoardData={communityBoardData}
          communityBoardDataSSR={communityBoardDataSSR}
          isFetching={isFetching}
          texts={texts}
          isStarBoardTableHeader
          onClickWrite={() => false}
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

export default CommunityBoardWrapper;
