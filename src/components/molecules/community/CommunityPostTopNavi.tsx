import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import IconVerticalMore from '@/components/atoms/IconVerticalMore';
import IconFilter from '@/components/atoms/IconFilter';
import { Dispatch, SetStateAction } from 'react';
import { Popover } from '@mantine/core';

const CommunityPostTopNavi = () => {
  const router = useRouter();
  const handleClickMore = () => {
    // eslint-disable-next-line no-console
    console.log('popup open');
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
            iconCss={{ margin: '3px', width: '30px', height: '30px', cursor: 'pointer' }}
            onClickBack={() => router.back()}
          />
          <h2>글</h2>
        </div>
        <div
          css={{
            cursor: 'pointer',
            width: 40,
            heigh: 40,
          }}
        >
          <Popover width={60} position="bottom-end" shadow="none" 
          styles={() => ({
            dropdown: {
              padding: 0,
              border: "1px solid #d9d9d9",
              borderRadius: "6px"
            },
          })}
          >
            <Popover.Target>
            <button css={{
              display: 'flex',
              outline: 'none',
              border: "none",
              background: "none",
            }}><IconVerticalMore/></button>
            </Popover.Target>
            <Popover.Dropdown>
              <ul css={{
                display: "flex",
                flexDirection: "column",
                minWidth: "60px",
                '& > li' : {
                  padding: "8px 16px",
                  color: "#101010",
                  fontSize: 14,
                  fontWeight: 400
                },
                '& > li:nth-of-type(1)' : {
                  borderBottom: "1px solid #d9d9d9"
                }
              }}>
                <li onClick={() => console.log("edit")}>수정</li>
                <li onClick={() => console.log("delete")}>삭제</li>
              </ul>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default CommunityPostTopNavi;
