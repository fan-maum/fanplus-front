import { Group, Stack, Avatar } from '@/components/atoms';
import { CommentListItemType } from '@/types/community';
import CommentPopover from './CommentPopover';
import { CommunityPostTextType } from '@/types/textTypes';
import { getKSTtimeDate } from '@/utils/communityUtil';
import { colors } from '@/styles/CommunityColors';

type CommentInfoStateProps = {
  identity: string;
  comment?: CommentListItemType;
  reply?: CommentListItemType;
  texts: CommunityPostTextType;
};

function CommentInfoState({ identity, comment, reply, texts }: CommentInfoStateProps) {
  const commentContent = comment?.COMMENT === false ? texts.deleted : comment?.COMMENT;
  const replyContent = reply?.COMMENT === false ? texts.deleted : reply?.COMMENT;
  const isComment = comment ? true : false;
  const getCommentTimeDate = comment && getKSTtimeDate(comment.INS_DATE, texts);
  const getReplyTimeDate = reply && getKSTtimeDate(reply.INS_DATE, texts);

  return (
    <Group position="apart" spacing={30} align={'flex-start'} css={{ flexWrap: 'nowrap', flex: 1 }}>
      <Group spacing={10} align={'center'} css={{ flexWrap: 'nowrap' }}>
        <div css={{ position: 'relative' }}>
          <Avatar
            imageProps={{ style: { borderRadius: '50%' } }}
            w={60}
            h={60}
            radius={'50%'}
            css={{
              border: '1px solid #F8F8F9',
              marginTop: '-6px',
            }}
            src={comment ? comment?.PROFILE_IMG_URL : reply?.PROFILE_IMG_URL}
            alt="Avatar"
          />
        </div>
        <Stack fw={600} fz={17} spacing={5}>
          <Group spacing={10}>
            <h4 css={{ color: colors.gray[1000], fontSize: 16, fontWeight: 600 }}>
              {comment ? comment.NICK : reply?.NICK}
            </h4>
            <div
              css={{
                fontSize: 16,
                color: colors.gray[500],
                fontWeight: 400,
              }}
            >
              {isComment ? getCommentTimeDate : getReplyTimeDate}
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
        isWriter={comment ? comment?.IS_WRITER : reply?.IS_WRITER}
        comment_idx={comment ? comment.COMMENT_IDX : reply?.COMMENT_IDX}
        texts={texts}
        isComment={isComment}
      />
    </Group>
  );
}

export default CommentInfoState;
