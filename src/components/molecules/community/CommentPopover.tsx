import { Popover } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import { modalBlockState, selectInfoState } from '@/store/community';
import IconHorizontalMore from '@/components/atoms/IconHorizontalMore';
import { PurPoseType, TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { showModalOnClick } from '@/utils/communityUtil';

type CommentPopoverProps = {
  identity: string;
  comment_idx: any;
  isWriter: string | undefined;
  texts: CommunityPostTextType;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};
export default function CommentPopover({
  identity,
  comment_idx,
  isWriter,
  texts,
  showReportModalBlockOnClick,
}: CommentPopoverProps) {
  const setModalBlock = useSetRecoilState(modalBlockState);
  const setSelectInfo = useSetRecoilState(selectInfoState);
  const showModalBlockOnClick = async () =>
    await showModalOnClick({
      purpose: 'delete',
      target_type: 'comment',
      idx: comment_idx,
      setModalBlock,
      setSelectInfo,
    });

  const router = useRouter();
  const ReportOnClick = () => {
    if (identity !== null) {
      showReportModalBlockOnClick('report', 'comment', comment_idx);
    } else {
      const path = router.asPath;
      router.push({ pathname: '/login', query: { nextUrl: path } });
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
            <li onClick={showModalBlockOnClick}>
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
