import { useRouter } from 'next/router';
import { useState } from 'react';
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

type CommunityBoardLayoutPropTypes = {
  communityBoardSSRdata:
    | CommunityBoardResponseType
    | CommunityBoardAllResponseType
    | CommunityBoardMyPostResponseType;
  boardType: string | number;
  boardTitle: string;
};

const CommunityBoardLayout = ({
  queryParams,
  communityBoardSSRdata,
  initialProps,
  boardType,
  boardTitle,
}: CommunityBoardPropTypes & CommunityBoardLayoutPropTypes) => {
  //eslint-disable-next-line no-console
  console.log('communityBoardSSRdata', communityBoardSSRdata);

  const router = useRouter();
  const { urlLang, userId, boardLangCookie, maxPage } = queryParams;
  const texts = communityBoardTexts[urlLang];
  const serverLang = translateUrlLangToServerLang(urlLang);
  const page = Number(router.query.page) || 1;
  const topicIndex = Number(router.query.topic) || 0;
  const view_type = (router.query.view as string) || 'all';

  const [boardLang, setBoardLang] = useState(boardLangCookie);
  const [langModal, setLangModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);

  //   const isBestBoard = boardIndex === 2291 || String(router.query.boardType) === '2291';
  //   const currentBoardIndex = isBestBoard ? 2291 : Number(router.query.boardIndex);

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
          communityBoardData={communityBoardData}
          communityBoardSSRdata={communityBoardSSRdata}
          isFetching={isFetching}
          texts={texts}
          boardType={String(boardType)}
          onClickWrite={() => {}}
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
