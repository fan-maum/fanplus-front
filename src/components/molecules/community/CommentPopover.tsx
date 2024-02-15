import { Popover } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import {
  blockUserModalBlockState,
  checkCommentState,
  modalBlockState,
  reportModalBlockState,
  selectInfoState,
} from '@/store/community';
import IconHorizontalMore from '@/components/atoms/IconHorizontalMore';
import { CommunityPostTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import {
  showBlockUserModalBlockOnClick,
  showModalOnClick,
  showReportModalBlockOnClick,
} from '@/utils/communityUtil';
import IconVerticalMore from '@/components/atoms/IconVerticalMore';
import { colors } from '@/styles/CommunityColors';

type CommentPopoverProps = {
  identity: string;
  comment_idx: any;
  writer_idx: any;
  isWriter: string | undefined;
  texts: CommunityPostTextType;
  isComment: boolean;
};
export default function CommentPopover({
  identity,
  comment_idx,
  writer_idx,
  isWriter,
  texts,
  isComment,
}: CommentPopoverProps) {
  const setModalBlock = useSetRecoilState(modalBlockState);
  const setReportModalBlock = useSetRecoilState(reportModalBlockState);
  const setBlockUserModalBlock = useSetRecoilState(blockUserModalBlockState);
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

  const BlockUserOnClick = async () => {
    if (identity !== null) {
      await showBlockUserModalBlockOnClick({
        purpose: 'block',
        target_type: 'comment',
        idx: writer_idx,
        isComment,
        setCheckComment,
        setBlockUserModalBlock,
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
          <IconVerticalMore iconCss={{ width: 20, height: 20 }} />
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
            <>
              <li onClick={ReportOnClick} css={{ borderBottom: `1px solid ${colors.gray[200]}` }}>
                {texts.report}
              </li>
              <li onClick={BlockUserOnClick}>{texts.block}</li>
            </>
          )}
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
}
