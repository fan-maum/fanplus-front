import { deleteLikes, postLikes } from '@/api/Community';
import { Group, Stack, UnstyledButton } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import ReplyButton from '@/components/atoms/IconReply';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import {
  CommunityCommentListItemType,
  CommunityPost_CommentListItemType,
  replyResponseType,
} from '@/types/community';
import axios from 'axios';
import { useEffect, useState } from 'react';
import IconReply from '@/components/atoms/IconReply';

export type CommentCardProps = {
  identity: string;
  replyList: replyResponseType;
  // comment: CommunityCommentListItemType;
  ReplyOnToggle?: (comment_idx: any) => void;
};
const ReplyCard = ({ identity, replyList, ReplyOnToggle }: CommentCardProps) => {
  console.log(replyList);
  const replyData: Array<CommunityCommentListItemType> = replyList?.RESULTS?.DATAS.COMMENTS;
  console.log(replyData);

  // const [likes, setLikes] = useState(false);
  // const LikesOnClick = async () => {
  //   if (replyList.ALREADY_LIKE === 'Y' || likes === true) {
  //     const res = await deleteLikes(replyList.COMMENT_IDX, identity);
  //     setLikes(false);
  //   } else {
  //     const res = await postLikes(replyList.COMMENT_IDX, identity);
  //     setLikes(true);
  //   }
  // };

  return (
    <Stack p={'26px 20px 20px 20px'} spacing={18}>
      {/* <CommentInfoState identity={identity} comment={comment} /> */}
      <Group position="apart" ml={68}>
        <div>
          {/* {comment.RE_COMMENT_CNT !== '0' && (
            <>
              <UnstyledButton
                fz={16}
                fw={400}
                css={{ color: '#999', marginRight: 22 }}
                onClick={ReplyOnToggle}
              >
                답글 {comment.RE_COMMENT_CNT}
                <IconReply />
              </UnstyledButton>
            </>
            // <ReplyButton count={comment.RE_COMMENT_CNT} />
          )} */}
          <UnstyledButton fz={16} fw={400} css={{ color: '#999' }} onClick={ReplyOnToggle}>
            답글쓰기
          </UnstyledButton>
        </div>
        <LikesButton
          buttonSize="medium"
          padding="0"
          // alreadyLike={comment.ALREADY_LIKE}
          // likes={likes}
          // count={Number(comment.LIKE_CNT)}
          // onClick={LikesOnClick}
        />
      </Group>
    </Stack>
  );
};

export default ReplyCard;
