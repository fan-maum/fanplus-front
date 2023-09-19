import type { CommunityBoardResponseType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import CommunityBoardNoPost from '../organisms/community/CommunityBoardNoPost';

// TODO 1. 각 게시글 실제 link 연결 (경은님과 함께 해야함) (하단 탭바의 글쓰기 링크도 연결해야함)

export type CommunityMyPostPropType = {
  communityBoardData: CommunityBoardResponseType;
  texts: CommunityBoardTextType;
};

const CommunityMyPostTemplate = ({ communityBoardData, texts }: CommunityMyPostPropType) => {
  const router = useRouter();

  const postList = communityBoardData.RESULTS.DATAS.POST_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;

  const isPostExist = boardInfo.POST_CNT !== 0;

  const onClickWrite = () => router.push('/');

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
              return <CommunityBoardArticle postItem={post} link="/" key={idx} texts={texts} />;
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
    </div>
  );
};

export default CommunityMyPostTemplate;
