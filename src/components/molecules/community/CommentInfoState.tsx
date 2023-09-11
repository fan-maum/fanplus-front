import { Group, Stack, Avatar } from '@/components/atoms';
import { GetLanguage } from '@/hooks/useLanguage';
import { voteDetailLangState } from '@/store/voteLangState';
import { CommunityCommentListItemType, CommunityPost_PostInfoItemType } from '@/types/community';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import CommentPopover from './CommentPopover';

type CommentInfoStateProps = {
  comment: CommunityCommentListItemType;
};

function CommentInfoState({ comment }: CommentInfoStateProps) {
  return (
    <Group position="apart" align={'flex-start'}>
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
            src={comment.PROFILE_IMG_URL}
            alt="Avatar"
          />
        </div>
        <Stack fw={600} fz={17} pt={6} spacing={5}>
          <Group spacing={10}>
            <h4 css={{ color: '#000', fontSize: 18, fontWeight: 600 }}>{comment.NICK}</h4>
            <div
              css={{
                fontSize: 16,
                color: '#999',
                fontWeight: 400,
              }}
            >
              {comment.INS_DATE}
            </div>
          </Group>
          <div
            css={{
              color: '#101010',
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            {comment.COMMENT}
          </div>
        </Stack>
      </Group>
      <CommentPopover />
    </Group>
  );
}

export default CommentInfoState;
