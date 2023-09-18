import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import IconVerticalMore from '@/components/atoms/IconVerticalMore';
import { Popover } from '@mantine/core';
import { CommunityPostTextType } from '@/types/textTypes';
import { PurPoseType, TargetType } from '@/types/common';

export type CommunityPostTopNaviProps = {
  user_idx: string;
  writer_idx: string;
  texts: CommunityPostTextType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  postIndex: string;
};
const CommunityPostTopNavi = ({
  user_idx,
  writer_idx,
  texts,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
  postIndex,
}: CommunityPostTopNaviProps) => {
  const router = useRouter();
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
            iconCss={{ margin: '3px', width: '30px', height: '30px', cursor: 'pointer' }}
            onClickBack={() => router.back()}
          />
          <h2>{texts.post}</h2>
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
                        console.log("edit");
                        // showModalBlockOnClick('edit', 'post', postIndex)
                      }}
                      css={{ borderBottom: '1px solid #d9d9d9' }}
                    >
                      {texts.edit}
                    </li>
                    <li onClick={() => showModalBlockOnClick('delete', 'post', postIndex)}>
                      {texts.delete}
                    </li>
                  </>
                ) : (
                  <li onClick={() => showReportModalBlockOnClick('report', 'post', postIndex)}>
                    {texts.report}
                  </li>
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
