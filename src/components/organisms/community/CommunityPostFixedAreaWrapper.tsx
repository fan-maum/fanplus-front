import CommunityPostBottomNavi from '@/components/molecules/community/CommunityPostBottomNavi';
import CommentRegister from './CommentRegister';
import { useState } from 'react';
import { TargetType } from '@/types/common';

export type CommunityPostFixedAreaWrapperProps = {
  identity: string;
  POST_IDX: string;
  WRITER_PROFILE_IMG: string;
  commentTotalCount: string | number;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: string,
    contents: any
  ) => void;
};

const CommunityPostFixedAreaWrapper = ({
  identity,
  POST_IDX,
  WRITER_PROFILE_IMG,
  commentTotalCount,
  onCreateComment,
}: CommunityPostFixedAreaWrapperProps) => {
  return (
    <div
      css={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '2px solid #F1F1F1',
        margin: '0 auto',
        background: '#fff',
      }}
    >
      <CommentRegister
        identity={identity}
        POST_IDX={POST_IDX}
        WRITER_PROFILE_IMG={WRITER_PROFILE_IMG}
        createMode={'post'}
        onCreateComment={onCreateComment}
      />
      <CommunityPostBottomNavi commentTotalCount={commentTotalCount} />
    </div>
  );
};

export default CommunityPostFixedAreaWrapper;
