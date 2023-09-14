import { Group, Stack, Avatar } from '@/components/atoms';
import { voteDetailLangState } from '@/store/voteLangState';
import {
  CommunityCommentListItemType,
  CommunityPost_CommentListItemType,
  CommunityPost_PostInfoItemType,
} from '@/types/community';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import CommentPopover from './CommentPopover';

type CommentInfoStateProps = {
  identity: string;
  comment?: CommunityPost_CommentListItemType;
  reply?: CommunityCommentListItemType;
  // comment: CommunityCommentListItemType;
};

function CommentInfoState({ identity, comment, reply }: CommentInfoStateProps) {
  return (
    <Group position="apart" spacing={30} align={'flex-start'} css={{ flexWrap: 'nowrap' }}>
      <Group spacing={10} align={'flex-start'} css={{ flexWrap: 'nowrap' }}>
        <div css={{ position: 'relative' }}>
          <Avatar
            imageProps={{ style: { borderRadius: '50%' } }}
            w={60}
            h={60}
            radius={'50%'}
            css={{
              border: '1px solid #F8F8F9',
            }}
            src={comment ? comment?.USER_PROFILE_IMG : reply?.PROFILE_IMG_URL}
            alt="Avatar"
          />
        </div>
        <Stack fw={600} fz={17} pt={6} spacing={5}>
          <Group spacing={10}>
            <h4 css={{ color: '#000', fontSize: 18, fontWeight: 600 }}>
              {comment ? comment.NICK : reply?.NICK}
            </h4>
            <div
              css={{
                fontSize: 16,
                color: '#999',
                fontWeight: 400,
              }}
            >
              {comment ? comment.INS_DATE : reply?.INS_DATE}
            </div>
          </Group>
          <div
            css={{
              color: '#101010',
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            {comment ? comment.COMMENT : reply?.COMMENT}
          </div>
        </Stack>
      </Group>
      <CommentPopover
        identity={identity}
        comment_idx={comment ? comment.COMMENT_IDX : reply?.COMMENT_IDX}
      />
    </Group>
  );
}

export default CommentInfoState;
