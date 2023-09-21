import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import IconVerticalMore from '@/components/atoms/IconVerticalMore';
import { Popover } from '@mantine/core';
import { CommunityPostTextType } from '@/types/textTypes';
import { PurPoseType, TargetType } from '@/types/common';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalBlockState, selectInfoState } from '@/store/community';
import { showModalOnClick } from '@/utils/communityUtil';

export type CommunityPostTopNaviProps = {
  identity: string;
  user_idx: string;
  writer_idx: string;
  texts: CommunityPostTextType;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  postIndex: string;
};
const CommunityPostTopNavi = ({
  identity,
  user_idx,
  writer_idx,
  texts,
  showReportModalBlockOnClick,
  postIndex,
}: CommunityPostTopNaviProps) => {
  const router = useRouter();
  const setModalBlock = useSetRecoilState(modalBlockState);
  const setSelectInfo = useSetRecoilState(selectInfoState);
  const showModalBlockOnClick = async () =>
    await showModalOnClick({
      purpose: 'delete',
      target_type: 'post',
      idx: postIndex,
      setModalBlock,
      setSelectInfo,
    });

  const ReportOnClick = () => {
    if (identity !== null) {
      showReportModalBlockOnClick('report', 'post', postIndex);
    } else {
      const path = router.asPath;
      router.push({ pathname: '/login', query: { nextUrl: path } });
    }
  };

  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '10px',
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <IconArrowLeft
            iconCss={{ margin: '3px', width: '24px', height: '24px', cursor: 'pointer' }}
            onClickBack={() => router.back()}
          />
          <h2 css={{ fontSize: 28, fontWeight: 600, color: ' #000' }}>{texts.post}</h2>
        </div>
        <div
          css={{
            cursor: 'pointer',
            width: 40,
            heigh: 40,
          }}
        >
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
                        // eslint-disable-next-line no-console
                        console.log('edit');
                      }}
                      css={{ borderBottom: '1px solid #d9d9d9' }}
                    >
                      {texts.edit}
                    </li>
                    <li onClick={showModalBlockOnClick}>{texts.delete}</li>
                  </>
                ) : (
                  <li onClick={ReportOnClick}>{texts.report}</li>
                )}
              </ul>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default CommunityPostTopNavi;
