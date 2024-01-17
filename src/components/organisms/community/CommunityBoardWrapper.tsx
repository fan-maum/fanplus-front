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

type CommunityBoardWrapperProps = {
  urlLang: UrlLangType;
  userId: string;
  boardTitle: string;
  boardType: string;
  isAdminAccount: boolean;
  boardLangCookie: BoardLangType;
  communityBoardData: CommunityBoardResponseType;
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
  communityBoardData,
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
          onClickWrite={() => false}
        />
        <CommunityBoardArticleTable
          communityBoardDataSSR={communityBoardData}
          texts={texts}
          queries={{ userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType }}
          isInitialData={isInitialData}
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
