import { useEffect } from 'react';
import styled from '@emotion/styled';
import { BoardCategoryItemType } from '@/types/community';
import { useRouter } from 'next/router';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type SearchScrollTabBarProps = {
  tabs: BoardCategoryItemType[];
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
};

const SearchScrollTabBar = ({
  tabs,
  searchTabState: [activeTab, setActiveTab],
}: SearchScrollTabBarProps) => {
  const router = useRouter();
  const { category_type, searchValue, page = 0 } = router?.query;
  const handleTabClick = (index: number, tabName: string) => {
    setActiveTab(tabName);
    router.push({
      pathname: router.pathname,
      query: {
        category_type: tabs[index].CATEGORY_IDX,
        searchValue: searchValue,
      },
    });
  };

  useEffect(() => {
    if (category_type) {
      const matchCategoryQuery = tabs.find(
        (tab) => tab.CATEGORY_IDX === parseInt(category_type as string)
      );
      setActiveTab(matchCategoryQuery?.CATEGORY_NAME);
    }
  }, [category_type, setActiveTab]);

  return (
    <>
      <TabContainer>
        <div className="prev"></div>
        <Swiper
          slidesPerView="auto"
          pagination={{ type: 'bullets', bulletElement: 'span', clickable: true }}
          loop={false}
          modules={[Pagination, Navigation]}
          onSwiper={(swiper) => swiper}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
        >
          {tabs.map((tab, index) => (
            <SwiperSlide
              key={index}
              //   active={activeTab === tab.CATEGORY_NAME}
              onClick={() => handleTabClick(index, tab.CATEGORY_NAME)}
            >
              <Title active={activeTab === tab.CATEGORY_NAME}>{tab.CATEGORY_NAME}</Title>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="next"></div>
      </TabContainer>
    </>
  );
};

export default SearchScrollTabBar;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .swiper-slide {
    width: max-content;
    cursor: pointer;
    padding: 14px;
    & > span {
      flex-shrink: 0;
      width: auto;
      height: 100%;
      display: flex;
    }
  }
  .prev {
    content: '';
    width: 8%;
    min-width: 28px;
    height: 100%;
    top: 0;
    padding-left: 6px;
    background: center url('/icons/icon_swiperLeft.svg') no-repeat;
    z-index: 100;
    cursor: pointer;
  }
  .next {
    content: '';
    width: 8%;
    min-width: 28px;
    height: 100%;
    top: 0;
    padding-right: 6px;
    background: center url('/icons/icon_swiperLeft.svg') no-repeat;
    transform: rotate(180deg);
    z-index: 100;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    .prev {
      display: none;
    }
    .next {
      display: none;
    }
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  flex-shrink: 0;
  width: auto;
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 16px 18px;
  cursor: pointer;
  transition: 0.3s;
  background-color: #fff;
`;

const Title = styled.span<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  text-transform: uppercase;
  padding: 0 4px;
  font-size: 18px;
  line-height: 24px;
  transition: 0.3s;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  color: ${(props) => (props.active ? '#FF5656' : '#666')};
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => (props.active ? '#FF5656' : 'transparent')};
`;
