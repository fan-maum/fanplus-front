import type { CommunityBoardResponseType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import CommunityBoardTopNavi from '../molecules/community/CommunityBoardTopNavi';
import CommunityBoardArticle from '../molecules/community/CommunityBoardArticle';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import CommunityBoardNoPost from '../organisms/community/CommunityBoardNoPost';
import { useUrlLanguage } from '@/hooks/useLanguage';

export type CommunityMyPostPropType = {
  communityBoardData: CommunityBoardResponseType;
  texts: CommunityBoardTextType;
};

const CommunityMyPostTemplate = ({ communityBoardData, texts }: CommunityMyPostPropType) => {
  const router = useRouter();
  const language = useUrlLanguage();

  const postList = communityBoardData.RESULTS.DATAS.POST_LIST;
  const boardInfo = communityBoardData.RESULTS.DATAS.BOARD_INFO;

  const isPostExist = boardInfo.POST_CNT !== 0;

  const onClickWrite = () => {
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
    </div>
  );
};

export default CommunityMyPostTemplate;
