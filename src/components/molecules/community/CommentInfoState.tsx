import { Group, Stack, Avatar } from '@/components/atoms';
import { CommentListItemType } from '@/types/community';
import CommentPopover from './CommentPopover';
import { PurPoseType, TargetType } from '@/types/common';

type CommentInfoStateProps = {
  identity: string;
  comment?: CommentListItemType;
  reply?: CommentListItemType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

function CommentInfoState({
  identity,
  comment,
  reply,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
}: CommentInfoStateProps) {
  const commentContent = comment?.COMMENT === false ? '삭제된 댓글입니다.' : comment?.COMMENT;
  const replyContent = reply?.COMMENT === false ? '삭제된 댓글입니다.' : reply?.COMMENT;
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
            src={comment ? comment?.PROFILE_IMG_URL : reply?.PROFILE_IMG_URL}
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
            {comment ? commentContent : replyContent}
          </div>
        </Stack>
      </Group>
      <CommentPopover
        identity={identity}
        isWriter={comment?.IS_WRITER}
        comment_idx={comment ? comment.COMMENT_IDX : reply?.COMMENT_IDX}
        showModalBlockOnClick={showModalBlockOnClick}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
      />
    </Group>
  );
}

export default CommentInfoState;
