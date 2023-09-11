import { CommunityNoticeBannerItemType } from '@/types/community';
import { useRouter } from 'next/router';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type OwnPropType = {
  bannerList: Array<CommunityNoticeBannerItemType>;
};

const CommunityBoardNoticeBanner = ({ bannerList }: OwnPropType) => {
  return (
    <>
      <section
        css={{
          width: '100%',
          height: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Swiper
          pagination={{ type: 'bullets', bulletElement: 'span', clickable: true }}
          loop={true}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          onSwiper={(swiper) => swiper}
          touchMoveStopPropagation
          touchStartForcePreventDefault
          css={{
            '.swiper-pagination': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            '.swiper-pagination-bullet': {
              margin: '0px 4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#d9d9d9',
              cursor: 'pointer',
            },
            '.swiper-pagination-bullet-active': { backgroundColor: '#ff5656' },
          }}
        >
          {bannerList.map((banner, idx) => {
            return (
              <SwiperSlide key={idx}>
                <NoticeBanner bannerData={banner} />
              </SwiperSlide>
            );
          })}
        </Swiper>
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#' + bannerData.BG_HEX,
        margin: '0px 16px 12px',
        padding: '16px 0px',
        lineHeight: '2',
        textAlign: 'center',
        borderRadius: '8px',
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
