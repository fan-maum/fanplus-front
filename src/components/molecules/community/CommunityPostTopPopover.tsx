import IconVerticalMore from '@/components/atoms/IconVerticalMore';
import {
  blockUserModalBlockState,
  modalBlockState,
  reportModalBlockState,
  selectInfoState,
} from '@/store/community';
import { CommunityPostTextType } from '@/types/textTypes';
import {
  showBlockUserModalBlockOnClick,
  showModalOnClick,
  showReportModalBlockOnClick,
} from '@/utils/communityUtil';
import { pathOnly } from '@/utils/util';
import { Popover } from '@mantine/core';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

export type CommunityPostTopNaviProps = {
  identity: string;
  user_idx: string;
  writer_idx: string;
  texts: CommunityPostTextType;
  postIndex: string;
};
const CommunityPostTopPopover = ({
  identity,
  user_idx,
  writer_idx,
  texts,
  postIndex,
}: CommunityPostTopNaviProps) => {
  const router = useRouter();
  const setModalBlock = useSetRecoilState(modalBlockState);
  const setReportModalBlock = useSetRecoilState(reportModalBlockState);
  const setBlockUserModalBlock = useSetRecoilState(blockUserModalBlockState);
  const setSelectInfo = useSetRecoilState(selectInfoState);
  const showModalBlockOnClick = async () =>
    await showModalOnClick({
      purpose: 'delete',
      target_type: 'post',
      idx: postIndex,
      setModalBlock,
      setSelectInfo,
    });

  const ReportOnClick = async () => {
    if (identity !== null) {
      await showReportModalBlockOnClick({
        purpose: 'report',
        target_type: 'post',
        idx: postIndex,
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
        target_type: 'post',
        idx: writer_idx,
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
      width={60}
      position="bottom-end"
      shadow="none"
      styles={() => ({
        dropdown: {
          width: 'auto !important',
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
            },
          }}
        >
          {writer_idx === user_idx ? (
            <>
              <li
                onClick={() => {
                  router.push(pathOnly(router.asPath) + 'edit/');
                }}
                css={{ borderBottom: '1px solid #d9d9d9' }}
              >
                {texts.edit}
              </li>
              <li onClick={showModalBlockOnClick}>{texts.delete}</li>
            </>
          ) : (
            <>
              <li onClick={ReportOnClick} css={{ borderBottom: '1px solid #d9d9d9' }}>
                {texts.report}
              </li>
              <li onClick={BlockUserOnClick}>{texts.block}</li>
            </>
          )}
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CommunityPostTopPopover;
