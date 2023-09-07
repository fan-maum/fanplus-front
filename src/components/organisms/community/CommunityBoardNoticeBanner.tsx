import { CommunityNoticeBannerItemType } from '@/types/community';
import { useRouter } from 'next/router';
import { useState, MouseEvent, TouchEvent } from 'react';
import { css } from '@emotion/react';

type OwnPropType = {
  bannerLists: Array<CommunityNoticeBannerItemType>;
};

const CommunityBoardNoticeBanner = ({ bannerLists }: OwnPropType) => {
  const [scroll, setScroll] = useState(false);
  const [xCoordinate, setXCoordinate] = useState(0);
  const [translation, setTranslation] = useState('');
  // const [currPo];

  const handleScroll = (event: MouseEvent<HTMLDivElement>) => {
    if (scroll) {
      console.log('hi');
      setTranslation(`transform: translateX(${event.clientX - xCoordinate}px);`);
    }
  };
  const handleTouchScroll = (event: TouchEvent<HTMLDivElement>) => {
    setTranslation(`transform: translateX(${event.changedTouches[0].pageX}px);)`);
  };

  return (
    <>
      <section
        css={{
          width: '100%',
          height: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          // '::-webkit-scrollbar': { display: 'none' },
          // scrollbarWidth: 'none',
          // msOverflowStyle: 'none',
        }}
      >
        <div
          css={[
            {
              display: 'flex',
              width: `${bannerLists.length * 100}%`,
              height: '100%',
              transition: 'transform 0.01s linear',
              div: {
                width: '33.3%',
              },
            },
            css(translation),
          ]}
          onMouseDown={(e) => {
            setScroll(true);
            setXCoordinate(e.clientX);
          }}
          onMouseUp={() => setScroll(false)}
          onMouseMove={handleScroll}
          onTouchMove={handleTouchScroll}
        >
          {bannerLists.map((banner, idx) => {
            return <NoticeBanner bannerData={banner} key={idx} />;
          })}
        </div>
      </section>
    </>
  );
};

export default CommunityBoardNoticeBanner;

const NoticeBanner = ({ bannerData }: { bannerData: CommunityNoticeBannerItemType }) => {
  const router = useRouter();
  return (
    <div
      css={{
        backgroundColor: '#' + bannerData.BG_HEX,
        margin: '15px',
        padding: '15px',
        lineHeight: '2',
        textAlign: 'center',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
      onClick={() => {
        router.push(`/community/board/${bannerData.BOARD_IDX}/`);
      }}
    >
      <p css={{ color: '#' + bannerData.SUBTITLE_HEX, fontSize: '12px' }}>{bannerData.SUB_TITLE}</p>
      <p css={{ color: '#' + bannerData.TITLE_HEX, fontSize: '16px', fontWeight: '600' }}>
        {bannerData.TITLE}
      </p>
    </div>
  );
};
