import CommunityBoardLangSelector from '@/components/molecules/community/CommunityBoardLangSelector';
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

const CommunityMainBoard = ({
  urlLang,
  userId,
  boardLangCookie,
  communityMainBoardData,
  boardType,
  initialProps,
}: CommunityPropTypes & { boardType: string | string[] }) => {
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
          boardTitle={'전체글'}
          boardType={boardType}
          urlLang={urlLang}
          userId={userId}
          rightItem={
            <div css={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CommunityBoardLangSelector
                language={texts.boardLang[boardLang]}
                onClickOpenModal={() => setLangModal(true)}
                tooltipText={texts.langSelectorToolTip}
                boardLang={boardLang}
              />
            </div>
          }
        />
        <CommunityTypeBoardArticleTable
          communityBoardDataSSR={communityMainBoardData}
          texts={texts}
          queries={{ userId, boardType, page, requestLang, boardLang, maxPage, viewType }}
          isInitialData={isInitialData}
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
