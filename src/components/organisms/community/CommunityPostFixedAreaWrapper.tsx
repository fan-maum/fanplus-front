import CommunityPostBottomNavi from '@/components/molecules/community/CommunityPostBottomNavi';
import CommentRegister from './CommentRegister';

export type CommunityPostFixedAreaWrapperProps = {
  identity: string;
  BOARD_IDX: string;
  WRITER_PROFILE_IMG: string;
  commentTotalCount: number;
};

const CommunityPostFixedAreaWrapper = ({
  identity,
  BOARD_IDX,
  WRITER_PROFILE_IMG,
  commentTotalCount,
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
        BOARD_IDX={BOARD_IDX}
        WRITER_PROFILE_IMG={WRITER_PROFILE_IMG}
      />
      <CommunityPostBottomNavi commentTotalCount={commentTotalCount} />
    </div>
  );
};

export default CommunityPostFixedAreaWrapper;
