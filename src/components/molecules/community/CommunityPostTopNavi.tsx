import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import IconFilter from '@/components/atoms/IconFilter';
import { Dispatch, SetStateAction } from 'react';

const CommunityPostTopNavi = () => {
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
          <h2>글</h2>
        </div>
        <div
          css={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => console.log('test')}
        >
          <span css={{ margin: '0px 5px' }}>...</span>
        </div>
      </div>
    </>
  );
};

export default CommunityPostTopNavi;
