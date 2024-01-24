import { CommunityNoticeBannerItemType } from '@/types/community';
import { useRouter } from 'next/router';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useUrlLanguage } from '@/hooks/useLanguage';
import 'swiper/css';

type OwnPropType = {
  bannerList: Array<CommunityNoticeBannerItemType>;
};

const CommunityBoardNoticeBanner = ({ bannerList }: OwnPropType) => {
  return (
    <Swiper
      pagination={{ type: 'bullets', bulletElement: 'span', clickable: true }}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      height={108}
      touchMoveStopPropagation
      css={{
        '.swiper-pagination': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '16px',
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
      {bannerList?.map((banner, idx) => {
        return (
          <SwiperSlide key={idx}>
            <NoticeBanner bannerData={banner} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CommunityBoardNoticeBanner;

const NoticeBanner = ({ bannerData }: { bannerData: CommunityNoticeBannerItemType }) => {
  const router = useRouter();
  const language = useUrlLanguage();

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
        router.push(`/${language}/community/board/${bannerData.BOARD_IDX}/${bannerData.POST_IDX}/`);
      }}
    >
      <p css={{ color: '#' + bannerData.SUBTITLE_HEX, fontSize: '12px' }}>{bannerData.SUB_TITLE}</p>
      <p css={{ color: '#' + bannerData.TITLE_HEX, fontSize: '16px', fontWeight: '600' }}>
        {bannerData.TITLE}
      </p>
    </div>
  );
};
