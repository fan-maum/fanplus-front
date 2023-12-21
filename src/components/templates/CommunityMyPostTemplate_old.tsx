import type { CommunityMyPostPropType } from '@/pages/[locale]/community/board/[boardIndex]/mypost';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CommunityCommonModal from '../modals/CommunityCommonModal';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '../molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '../molecules/community/CommunityBoardArticleTableHeader';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import CommunityBoardNoPost from '../organisms/community/CommunityBoardNoPost';
import CommunityLayout from './CommunityLayout';

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

  const handlePageChange = (selectedItem: { selected: number }) => {
    router.replace({ query: { ...router.query, page: selectedItem.selected + 1 } });
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
        <CommunityBoardTopNavi boardTitle={texts.bottomTabBar.myPost} />
        {isPostExist ? (
          <div css={{ padding: '0 20px', '@media(max-width: 768px)': { padding: 0 } }}>
            <CommunityBoardArticleTableHeader />
            <ul>
              {postList?.map((post, idx) => {
                return (
                  <>
                    <CommunityBoardArticle
                      key={'CommunityBoardArticle' + idx}
                      postItem={post}
                      link={`/${urlLang}/community/board/${boardInfo?.BOARD_IDX}/${post.POST_IDX}`}
                    />
                    <CommunityBoardArticleMobile
                      key={'CommunityBoardArticleMobile' + idx}
                      postItem={post}
                      link={`/${urlLang}/community/board/${boardInfo?.BOARD_IDX}/${post.POST_IDX}`}
                      texts={texts}
                    />
                  </>
                );
              })}
            </ul>
            <CommunityBoardPagination
              totalCount={boardInfo?.POST_CNT as number}
              handlePageChange={handlePageChange}
            />
          </div>
        ) : (
          <CommunityBoardNoPost
            // onClickWrite={onClickWrite}
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
    </CommunityLayout>
  );
};

export default CommunityMyPostTemplate;
