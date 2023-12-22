import { colors } from '@/styles/CommunityColors';
import { UrlLangType } from '@/types/common';
import { BoardInfoType, PostInfoItemType } from '@/types/community';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CommunityPostInfo from './CommunityPostInfo';
import { CommunityPostTextType } from '@/types/textTypes';
import IconBookmark from '@/components/atoms/IconBookmark';

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

export const isPostDetailConstant: { [key: number]: boolean } = {
  0: true, //
  2291: true, // BEST 인기글
};

export const isPostDetailBoardTitle: { [key: number]: string } = {
  0: '전체글',
  2291: 'Best 인기글 (실시간)',
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
  const boardIndex = Number(router.query.boardIndex);

  return (
    <PostDetailHeaderWrapper>
      {isPostDetailConstant[boardIndex] && (
        <div className="post-header">
          <h2 className="header-title">{isPostDetailBoardTitle[boardIndex]}</h2>
          <IconBookmark width="24" height="24" iconCss={{ padding: 2 }} />
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
