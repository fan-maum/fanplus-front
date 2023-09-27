import { Popover } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import {
  checkCommentState,
  modalBlockState,
  reportModalBlockState,
  selectInfoState,
} from '@/store/community';
import IconHorizontalMore from '@/components/atoms/IconHorizontalMore';
import { CommunityPostTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { showModalOnClick, showReportModalBlockOnClick } from '@/utils/communityUtil';
import IconVerticalMore from '@/components/atoms/IconVerticalMore';

type CommentPopoverProps = {
  identity: string;
  comment_idx: any;
  isWriter: string | undefined;
  texts: CommunityPostTextType;
  isComment: boolean;
};
export default function CommentPopover({
  identity,
  comment_idx,
  isWriter,
  texts,
  isComment,
}: CommentPopoverProps) {
  const setModalBlock = useSetRecoilState(modalBlockState);
  const setReportModalBlock = useSetRecoilState(reportModalBlockState);
  const setSelectInfo = useSetRecoilState(selectInfoState);
  const setCheckComment = useSetRecoilState(checkCommentState);
  const showModalBlockOnClick = async () => {
    await showModalOnClick({
      purpose: 'delete',
      target_type: 'comment',
      idx: comment_idx,
      isComment,
      setCheckComment,
      setModalBlock,
      setSelectInfo,
    });
  };

  const router = useRouter();
  const ReportOnClick = async () => {
    if (identity !== null) {
      await showReportModalBlockOnClick({
        purpose: 'report',
        target_type: 'comment',
        idx: comment_idx,
        setReportModalBlock,
        setSelectInfo,
      });
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
          <IconVerticalMore />
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
            <li onClick={showModalBlockOnClick}>{texts.delete}</li>
          ) : (
            <li onClick={ReportOnClick}>{texts.report}</li>
          )}
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
}
