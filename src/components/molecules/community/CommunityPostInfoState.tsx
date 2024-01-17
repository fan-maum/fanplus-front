import { Avatar, Group, Stack } from '@/components/atoms';
import { PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';
import { getStandardTimeDate } from '@/utils/communityUtil';

export interface CommunityPostInfoStateProps {
  postInfo: PostInfoItemType;
  texts: CommunityPostTextType;
  postLikeState: number;
}

const CommunityPostInfoState = ({
  postInfo,
  texts,
  postLikeState,
}: CommunityPostInfoStateProps) => {
  const getTimeDate = getStandardTimeDate(postInfo.PUBLISH_DATE, texts);
  return (
    <Group spacing={10} align={'flex-start'}>
      <div css={{ position: 'relative' }}>
        <Avatar
          imageProps={{ style: { borderRadius: '50%' } }}
          w={60}
          h={60}
          radius={'50%'}
          css={{
            border: '1px solid #F8F8F9',
          }}
          src={postInfo.WRITER_PROFILE_IMG}
          alt="Avatar"
        />
      </div>
      <Stack fw={600} fz={17}>
        <h4 css={{ color: '#000', fontSize: 16, fontWeight: 600 }}>{postInfo.WRITER_NAME}</h4>
        <div
          css={{
            fontSize: 14,
            color: '#999',
            fontWeight: 400,
            paddingTop: 4,
          }}
        >
          {getTimeDate}
        </div>
        <Group spacing={10} fw={500} fz={14} mt={4} css={{ color: '#999' }}>
          <div>
            {texts.viewCount} {postInfo.VIEW_CNT}
          </div>
          <span>
            {texts.recommendCount} {postLikeState}
          </span>
        </Group>
      </Stack>
    </Group>
  );
};

export default CommunityPostInfoState;
