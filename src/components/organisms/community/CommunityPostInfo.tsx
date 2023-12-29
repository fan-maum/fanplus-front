import { Stack } from '@/components/atoms';
import PostToBoardButton from '@/components/atoms/PostToBoardButton';
import CommunityPostInfoState from '@/components/molecules/community/CommunityPostInfoState';
import CommunityPostTopPopover from '@/components/molecules/community/CommunityPostTopPopover';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type { BoardInfoType, PostInfoItemType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';

type CommunityPostInfoProps = {
  identity: string;
  user_idx: string;
  postInfo: PostInfoItemType;
  boardInfo: BoardInfoType;
  texts: CommunityPostTextType;
  postLikeState: number;
};

const CommunityPostInfo = ({
  identity,
  user_idx,
  postInfo,
  boardInfo,
  texts,
  postLikeState,
}: CommunityPostInfoProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const boardIndex = postInfo.BOARD_IDX;
  const { boardIndex: urlBoardIndex } = router.query;
  const isBestBoard = urlBoardIndex === '2291';

  const onClickToBoard = () => {
    router.push({
      pathname: `/${urlLang}/community/board/${boardIndex}/`,
      query: {
        page: router.query.page || 1,
        topic: router.query.topic || 0,
        view: router.query.view || 'all',
      },
    });
  };

  return (
    <Stack spacing={12} p={'18px 20px 30px'} css={{ borderBottom: '2px solid #f1f1f1' }}>
      <PostToBoardButton boardName={boardInfo.BOARD_TITLE} onClick={onClickToBoard} />
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <h2 css={{ color: '#000', fontSize: 20, fontWeight: 600 }}>
          {!isBestBoard && <span>[{postInfo.TOPIC_NAME}] </span>}
          {postInfo.POST_TITLE}
        </h2>
        <CommunityPostTopPopover
          identity={identity}
          user_idx={user_idx}
          writer_idx={postInfo.WRITER_IDX}
          texts={texts}
          postIndex={postInfo.POST_IDX}
        />
      </div>
      <CommunityPostInfoState postInfo={postInfo} texts={texts} postLikeState={postLikeState} />
    </Stack>
  );
};

export default CommunityPostInfo;
