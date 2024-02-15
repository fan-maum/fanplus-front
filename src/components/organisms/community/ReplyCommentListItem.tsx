import { replyResponseType } from '@/types/community';
import ReplyCard from './ReplyCard';
import { CommunityPostTextType } from '@/types/textTypes';
import { colors } from '@/styles/CommunityColors';
import { Stack } from '@/components/atoms';

type PostCommentListItemProps = {
  identity: string;
  replies: replyResponseType;
  texts: CommunityPostTextType;
  replyRefetch: () => void;
};

const ReplyCommentListItem = ({
  identity,
  replies,
  texts,
  replyRefetch,
}: PostCommentListItemProps) => {
  const repiesData = replies.RESULTS.DATAS.COMMENTS;

  return (
    <>
      {repiesData &&
        repiesData.map((reply: any, index) => (
          <li
            key={index}
            className="comment"
            css={{
              borderTop: `1px solid ${colors.gray[200]}`,
            }}
          >
            {reply.IS_BLOCKED_USER === 'Y' ? (
              <Stack
                align="cener"
                justify="center"
                w={'100%'}
                h={120}
                css={{ textAlign: 'center' }}
              >
                <p
                  css={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: colors.gray[1000],
                  }}
                >
                  차단된 회원의 댓글입니다.
                </p>
              </Stack>
            ) : (
              <ReplyCard
                identity={identity}
                reply={reply}
                texts={texts}
                replyRefetch={replyRefetch}
              />
            )}
          </li>
        ))}
    </>
  );
};

export default ReplyCommentListItem;
