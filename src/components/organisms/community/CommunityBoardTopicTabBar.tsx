import { colors } from '@/styles/CommunityColors';
import type { TopicListItemType } from '@/types/community';
import styled from '@emotion/styled';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type TopicTabBarPropType = {
  stringTopicAll: string;
  topicList: TopicListItemType[] | undefined;
  topicIndex: number;
  isMobile: boolean;
  onClickTopic: (topic: number) => void;
};

const CommunityBoardTopicTabBar = ({
  stringTopicAll,
  topicList,
  topicIndex,
  isMobile,
  onClickTopic,
}: TopicTabBarPropType) => {
  const topicAll = { IDX: 0, NAME: stringTopicAll };
  const topicLists = topicList && topicList.length > 1 ? [topicAll, ...topicList] : topicList;
  const isAdPhotoPc = topicList && topicList.length > 6 && !isMobile;

  return (
    <TopicContainer css={{ '::-webkit-scrollbar': { display: 'none' } }}>
      {!isAdPhotoPc ? (
        <>
          {topicLists?.map((topic, index) => (
            <Topic
              title={topic.NAME}
              key={index}
              selected={topicIndex === topic.IDX}
              onClick={() => onClickTopic(topic.IDX)}
            />
          ))}
        </>
      ) : (
        <>
          <div className="prev"></div>
          <Swiper
            slidesPerView="auto"
            pagination={{ type: 'bullets', bulletElement: 'span', clickable: true }}
            loop={false}
            modules={[Pagination, Navigation]}
            onSwiper={(swiper) => swiper}
            scrollbar={{
              hide: true,
            }}
            navigation={{
              prevEl: '.prev',
              nextEl: '.next',
            }}
          >
            {topicLists?.map((topic, index) => (
              <SwiperSlide key={index}>
                <Topic
                  title={topic.NAME}
                  selected={topicIndex === topic.IDX}
                  onClick={() => onClickTopic(topic.IDX)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="next"></div>
        </>
      )}
    </TopicContainer>
  );
};

export default CommunityBoardTopicTabBar;

const Topic = ({
  title,
  selected,
  onClick,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      css={{
        fontSize: '14px',
        fontWeight: selected ? 600 : 400,
        color: selected ? colors.primary[500] : colors.gray[1000],
        cursor: 'pointer',
        padding: '5px 8px',
      }}
      onClick={onClick}
    >
      {title}
    </li>
  );
};

const TopicContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  .swiper {
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-scrollbar: {
      display: none;
    }
  }
  .swiper-slide {
    width: max-content;
    cursor: pointer;
    white-space: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-scrollbar: {
      display: none;
    }
    & > span {
      flex-shrink: 0;
      width: auto;
      height: 100%;
      display: flex;
    }
  }
  .prev {
    content: '';
    width: 24px;
    min-width: 24px;
    height: 100%;
    top: 0;
    padding-left: 6px;
    background: center url('/icons/icon_swiper.svg') no-repeat;
    z-index: 100;
    cursor: pointer;
  }
  .next {
    content: '';
    width: 24px;
    min-width: 24px;
    height: 100%;
    top: 0;
    padding-right: 6px;
    background: center url('/icons/icon_swiper.svg') no-repeat;
    transform: rotate(180deg);
    z-index: 100;
    cursor: pointer;
  }
`;
