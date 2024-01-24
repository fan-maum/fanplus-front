import { colors } from '@/styles/CommunityColors';
import BoardDomains from './BoardDomains';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useUrlLanguage } from '@/hooks/useLanguage';
import CommunityBoardTopicTabBar from './CommunityBoardTopicTabBar';
import { useRouter } from 'next/router';
import { CommunityBoardTopicResponseType } from '@/types/community';

type DomainTopicContainerProps = {
  viewType: string;
  boardType: string | number;
  communityBoardTopics?: CommunityBoardTopicResponseType;
  topicIndex: number;
  onClickWrite: () => void;
};

const DomainTopicContainer = ({
  boardType,
  viewType,
  communityBoardTopics,
  topicIndex,
  onClickWrite,
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
    <>
      {!isCommunityOrBestBoard && (
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 0,
            height: 80,
          }}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '40px',
              padding: '6px 0',
              borderTop: `1px solid ${colors.gray[100]}`,
              borderBottom: `1px solid ${colors.gray[100]}`,
              '@media(max-width:768px)': {
                padding: '0 16px',
              },
            }}
          >
            <BoardDomains viewType={viewType} boardDomainTexts={texts.bottomTabBar} />
            <button
              css={{
                padding: '5px 8px',
                fontSize: 14,
                fontWeight: 600,
                outline: 'none',
                border: 'none',
                color: '#fff',
                backgroundColor: colors.primary[500],
                borderRadius: 6,
                cursor: 'pointer',
                display: 'none',
                '@media(max-width:768px)': { display: 'flex' },
              }}
              onClick={onClickWrite}
            >
              {texts.bottomTabBar.write}
            </button>
          </div>
          <CommunityBoardTopicTabBar
            stringTopicAll={texts.all}
            topicList={communityBoardTopics?.RESULTS.DATAS.TOPIC_LIST}
            topicIndex={topicIndex}
            onClickTopic={onClickTopic}
          />
        </div>
      )}
    </>
  );
};

export default DomainTopicContainer;
