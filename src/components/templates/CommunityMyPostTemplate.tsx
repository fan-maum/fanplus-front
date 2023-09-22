import type { CommunityBoardResponseType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import CommunityBoardNoPost from '../organisms/community/CommunityBoardNoPost';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import CommunityCommonModal from '../modals/CommunityCommonModal';

export type CommunityMyPostPropType = {
  communityBoardData: CommunityBoardResponseType;
  texts: CommunityBoardTextType;
};

const CommunityMyPostTemplate = ({ communityBoardData, texts }: CommunityMyPostPropType) => {
  const router = useRouter();
  const language = useUrlLanguage();

  const [permissionModal, setPermissionModal] = useState(false);

  const postList = communityBoardData.RESULTS.DATAS.POST_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;

  const isPostExist = boardInfo.POST_CNT !== 0;

  const onClickWrite = () => {
    const writeBanBoard = ['139', '192', '220'];
    const writeBanned = writeBanBoard.includes(boardInfo.BOARD_IDX);
    if (writeBanned) {
      console.log('banned!');
      setPermissionModal(true);
      return;
    }
    router.push(`/${language}/community/board/${boardInfo.BOARD_IDX}/write`);
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
                  link={`/${language}/community/board/${boardInfo.BOARD_IDX}/${post.POST_IDX}`}
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
