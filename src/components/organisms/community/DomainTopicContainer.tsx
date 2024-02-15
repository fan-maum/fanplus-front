import { colors } from '@/styles/CommunityColors';
import BoardDomains from './BoardDomains';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useUrlLanguage } from '@/hooks/useLanguage';
import CommunityBoardTopicTabBar from './CommunityBoardTopicTabBar';
import { useRouter } from 'next/router';
import { CommunityBoardTopicResponseType } from '@/types/community';
import CommunityBoardLangSelector from '@/components/molecules/community/CommunityBoardLangSelector';
import { Dispatch, SetStateAction } from 'react';
import { BoardLangType } from '@/types/common';
import styled from '@emotion/styled';

type DomainTopicContainerProps = {
  isMobile: boolean;
  viewType: string;
  boardType: string | number;
  boardLang: BoardLangType;
  communityBoardTopics?: CommunityBoardTopicResponseType;
  topicIndex: number;
  setLangModal: Dispatch<SetStateAction<boolean>>;
};

const DomainTopicContainer = ({
  isMobile,
  viewType,
  boardType,
  boardLang,
  communityBoardTopics,
  topicIndex,
  setLangModal,
}: DomainTopicContainerProps) => {
  const router = useRouter();
  const isCommunityOrBestBoard = boardType === 'community' || boardType === 2291;
  const urlLang = useUrlLanguage();
  const texts = communityBoardTexts[urlLang];

  const onClickTopic = async (topic: number) => {
    router.replace(
      { pathname: router.pathname, query: { ...router.query, topic, page: 1 } },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      {!isMobile && (
        <DomainAndLanguageFilterWrap>
          {!isCommunityOrBestBoard ? (
            <div className="domainTopicWrap">
              <BoardDomains viewType={viewType} boardDomainTexts={texts.bottomTabBar} />
              <div
                css={{
                  display: 'flex',
                  overflow: 'hidden',
                  '@media(max-width: 768px)': { display: 'none' },
                }}
              >
                <CommunityBoardTopicTabBar
                  stringTopicAll={texts.all}
                  topicList={communityBoardTopics?.RESULTS.DATAS.TOPIC_LIST}
                  topicIndex={topicIndex}
                  isMobile={isMobile}
                  onClickTopic={onClickTopic}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </DomainAndLanguageFilterWrap>
      )}
      <div
        css={{
          display: 'none',
          height: '40px',
          borderTop: `1px solid ${colors.gray[100]}`,
          '@media(max-width: 768px)': {
            display: communityBoardTopics?.RESULTS.DATAS.TOPIC_LIST ? 'flex' : 'none',
            alignItems: 'center',
          },
        }}
      >
        <CommunityBoardTopicTabBar
          stringTopicAll={texts.all}
          topicList={communityBoardTopics?.RESULTS.DATAS.TOPIC_LIST}
          topicIndex={topicIndex}
          isMobile={isMobile}
          onClickTopic={onClickTopic}
        />
      </div>
    </div>
  );
};

export default DomainTopicContainer;

const DomainAndLanguageFilterWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 6px 0;
  border-top: 1px solid ${colors.gray[100]};
  gap: 20px;
  .domainTopicWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 14px;
    width: 80%;
    flex: 1;
  }
  @media (max-width: 768px) {
    padding-left: 16px;
  }
`;
