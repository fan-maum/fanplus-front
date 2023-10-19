import { Stack } from '@/components/atoms';
import PostToBoardButton from '@/components/atoms/PostToBoardButton';
import TopicBubble from '@/components/atoms/TopicBubble';
import CommunityPostInfoState from '@/components/molecules/community/CommunityPostInfoState';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';

type CommunityPostInfoProps = {
  postInfo: PostInfoItemType;
  texts: CommunityPostTextType;
  postLikeState: number;
};

const CommunityPostInfo = ({ postInfo, texts, postLikeState }: CommunityPostInfoProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const boardIndex = postInfo.BOARD_IDX;

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
    <Stack spacing={12} p={20} css={{ borderBottom: '2px solid #f1f1f1' }}>
      <PostToBoardButton boardName={'방탄소년단디리단~'} onClick={onClickToBoard} />
      // !!! TODO: api response에 boardName 추가해야함
      <div css={{ display: 'flex' }}>
        <TopicBubble height={32} p={8} radius={20} name={postInfo.TOPIC_NAME} />
        {postInfo.HAS_POPULAR_BADGE === '1' && (
          <TopicBubble height={32} p={8} radius={20} hightlight={true} name={texts.popular} />
        )}
      </div>
      <div
        css={{
          paddingTop: 10,
          color: '#000',
          fontSize: 24,
          fontWeight: 600,
          '@media(max-width: 768px)': {
            fontSize: 22,
          },
        }}
      >
        {postInfo.POST_TITLE}
      </div>
      <CommunityPostInfoState postInfo={postInfo} texts={texts} postLikeState={postLikeState} />
    </Stack>
  );
};

export default CommunityPostInfo;
