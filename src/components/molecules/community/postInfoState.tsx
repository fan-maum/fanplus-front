import { Group, Stack, Avatar } from '@/components/atoms';
import { GetLanguage } from '@/hooks/useLanguage';
import { voteDetailLangState } from '@/store/voteLangState';
import { CommunityPost_PostInfoItemType } from '@/types/community';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

export interface PostInfoStateProps {
  postInfo: CommunityPost_PostInfoItemType;
}

function PostInfoState({ postInfo }: PostInfoStateProps) {
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
      <Stack fw={600} fz={17} pt={6}>
        <h4 css={{ color: '#000', fontSize: 18, fontWeight: 600 }}>{postInfo.WRITER_NAME}</h4>
        <div
          css={{
            fontSize: 16,
            color: '#999',
            fontWeight: 400,
            paddingTop: 2,
          }}
        >
          {postInfo.PUBLISH_DATE}
        </div>
        <Group spacing={10} fw={500} fz={16} mt={4} css={{ color: '#999' }}>
          <div>조회수 {postInfo.VIEW_CNT}</div>
          <span>추천수 {postInfo.RECOMMEND_CNT}</span>
        </Group>
      </Stack>
    </Group>
  );
}

export default PostInfoState;
