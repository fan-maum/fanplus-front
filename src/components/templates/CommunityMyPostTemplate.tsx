import type { CommunityMyPostPropType } from '@/pages/[locale]/community/board/[boardIndex]/mypost';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CommunityCommonModal from '../modals/CommunityCommonModal';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import CommunityBoardNoPost from '../organisms/community/CommunityBoardNoPost';

const CommunityMyPostTemplate = ({
  urlLang,
  userId,
  communityBoardData,
}: CommunityMyPostPropType) => {
  const router = useRouter();
  const texts = communityBoardTexts[urlLang];

  const [permissionModal, setPermissionModal] = useState(false);

  const postList = communityBoardData.RESULTS.DATAS.POST_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;

  const isPostExist = !(postList.length === 0 && (!router.query.page || router.query.page === '1'));

  const onClickWrite = () => {
    const writeBanBoard = ['139', '192', '220'];
    const writeBanned = writeBanBoard.includes(boardInfo.BOARD_IDX);
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

  return (
    <div
      css={{
        width: '100%',
        maxWidth: '768px',
        margin: '0px auto',
        position: 'relative',
      }}
    >
      <CommunityBoardTopNavi boardTitle={texts.bottomTabBar.myPost} />
      {isPostExist ? (
        <>
          <ul>
            {postList.map((post, idx) => {
              return (
                <CommunityBoardArticle
                  postItem={post}
                  link={`/${urlLang}/community/board/${boardInfo.BOARD_IDX}/${post.POST_IDX}`}
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
          texts={texts.noMyPostTexts}
        />
      )}
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

export default CommunityMyPostTemplate;
