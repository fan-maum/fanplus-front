import { Popover } from '@mantine/core';
import IconHorizontalMore from '@/components/atoms/IconHorizontalMore';
import { deleteComment } from '@/api/Community';
import { PurPoseType, TargetType } from '@/types/common';

type CommentPopoverProps = {
  identity: string;
  comment_idx: any;
  showModalBlockOnClick: (purpose: PurPoseType,target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType,target_type: TargetType, idx: string) => void;
};
export default function CommentPopover({ identity, comment_idx, showModalBlockOnClick, showReportModalBlockOnClick }: CommentPopoverProps) {
  return (
    <Popover
      width='auto'
      position="bottom-end"
      shadow="none"
      styles={() => ({
        dropdown: {
          padding: 0,
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
        },
      })}
    >
      <Popover.Target>
        <button
          css={{
            display: 'flex',
            outline: 'none',
            border: 'none',
            background: 'none',
          }}
        >
          <IconHorizontalMore />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <ul
          css={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '60px',
            '& > li': {
              padding: '8px 16px',
              color: '#101010',
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
            },
            '& > li:nth-of-type(1)': {
              borderBottom: '1px solid #d9d9d9',
            },
          }}
        >
          <li onClick={() => showReportModalBlockOnClick('report', 'comment', comment_idx)}>신고하기</li>
          <li onClick={() => showModalBlockOnClick('delete', 'comment', comment_idx)}>삭제</li>
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
}