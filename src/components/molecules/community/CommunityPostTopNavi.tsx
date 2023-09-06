import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import IconVerticalMore from '@/components/atoms/IconVerticalMore';
import IconFilter from '@/components/atoms/IconFilter';
import { Dispatch, SetStateAction } from 'react';

const CommunityPostTopNavi = () => {
  const router = useRouter();
  const handleClickMore = () => {
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
          <IconVerticalMore handleClickMore={handleClickMore} />
        </div>
      </div>
    </>
  );
};

export default CommunityPostTopNavi;
