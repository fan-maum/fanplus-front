import { Popover } from '@mantine/core';
import IconHorizontalMore from '@/components/atoms/IconHorizontalMore';
import { deleteComment } from '@/api/Community';
import { PurPoseType, TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { gotoLogin } from '@/utils/gotoLogin';

type CommentPopoverProps = {
  identity: string;
  comment_idx: any;
  isWriter: string | undefined;
  texts: CommunityPostTextType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};
export default function CommentPopover({
  identity,
  comment_idx,
  isWriter,
  texts,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
}: CommentPopoverProps) {
  const router = useRouter();
  const ReportOnClick = () => {
    if (identity !== null) {
      showReportModalBlockOnClick('report', 'comment', comment_idx);
    } else {
      gotoLogin(router);
    }
  };

  return (
    <Popover
      width="auto"
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
          }}
        >
          {isWriter === 'Y' ? (
            <li onClick={() => showModalBlockOnClick('delete', 'comment', comment_idx)}>
              {texts.delete}
            </li>
          ) : (
            <li onClick={ReportOnClick}>{texts.report}</li>
          )}
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
}
