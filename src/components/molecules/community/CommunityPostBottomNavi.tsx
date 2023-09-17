import ShareButton from '@/components/atoms/ShareButton';
import { Group } from '@/components/atoms';
import CommentCountButton from '@/components/atoms/CommentCountButton';

type CommunityPostBottomNaviProps = {
  commentTotalCount: string | number;
};

const CommunityPostBottomNavi = ({ commentTotalCount }: CommunityPostBottomNaviProps) => {
  const ShareOnClick = () => {
    // if (canShare) {
    //   window.navigator?.share({
    //     title: '팬플러스 투표 공유',
    //     text,
    //     url,
    //   });
    // } else {
    //   confirmModalOpened();
    // }
    // eslint-disable-next-line no-console
    console.log('clicked');
  };
  return (
    <div
      css={{
        background: '#FAFBFE',
        height: ' 100px',
      }}
    >
      <Group position="apart" maw={768} p={'30px 20px'} css={{ margin: '0 auto' }}>
        <CommentCountButton text={commentTotalCount} />
        <ShareButton onClick={ShareOnClick} css={{ background: 'none', width: 38, height: 38 }} />
      </Group>
    </div>
  );
};

export default CommunityPostBottomNavi;
