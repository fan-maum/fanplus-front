import { colors } from '@/styles/CommunityColors';
import { UrlLangType } from '@/types/common';
import { BoardInfoType, PostInfoItemType } from '@/types/community';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CommunityPostInfo from './CommunityPostInfo';
import { CommunityPostTextType } from '@/types/textTypes';
import { communityPostTexts } from '@/texts/communityPostTexts';

interface PostDetailHeaderProps {
  identity: string;
  user_idx: string;
  urlLang: UrlLangType;
  postInfo: PostInfoItemType;
  boardInfo: BoardInfoType;
  postLikeState: number;
  texts: CommunityPostTextType;
}

// export const isPostDetailConstant = {
//   community: true, //
//   best: true, // 2291
//   notice: true, // 139
//   free: true, // 160
//   suggest: true, // 161
//   knowledge: true, // 115
//   adPhoto: true, // 192
//   fanfic: true, // 114
//   fanficNotice: true, //220
// };

export const isPostDetailConstant: { [key: number | string]: boolean } = {
  community: true, //
  2291: true, // BEST 인기글
};

const PostDetailHeader = ({
  identity,
  user_idx,
  urlLang,
  postInfo,
  boardInfo,
  postLikeState,
  texts,
}: PostDetailHeaderProps) => {
  const router = useRouter();
  const boardFrom: any = router.query.from;
  const text = communityPostTexts[urlLang];

  const isPostDetailBoardTitle: { [key: number | string]: string } = {
    community: text.headerTitle.all,
    2291: text.headerTitle.best,
  };

  return (
    <PostDetailHeaderWrapper>
      {isPostDetailConstant[boardFrom] && (
        <div
          className="post-header"
          css={{ '@media(max-width:768px)': { display: 'none !important' } }}
        >
          <h2 className="header-title">{isPostDetailBoardTitle[boardFrom]}</h2>
        </div>
      )}
      <CommunityPostInfo
        identity={identity}
        user_idx={user_idx}
        postInfo={postInfo}
        boardInfo={boardInfo}
        texts={texts}
        postLikeState={postLikeState}
      />
    </PostDetailHeaderWrapper>
  );
};

export default PostDetailHeader;

const PostDetailHeaderWrapper = styled.div`
  .post-header {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0 20px;
    height: 40px;
    h2 {
      font-size: 18px;
      font-weight: 600;
      color: ${colors.gray[1000]};
    }
  }
`;
