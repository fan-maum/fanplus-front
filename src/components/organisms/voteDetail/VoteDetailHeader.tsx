import ShareButton from '@/components/atoms/ShareButton';
import { Group } from '@/components/atoms/Group';
import { UnstyledButton } from '@/components/atoms/UnstyledButton';
import { Center } from '@/components/atoms/Center';

function VoteDetailHeader() {
  return (
    <>
      <Group
        position="apart"
        css={{
          backgroundColor: 'white',
          width: '100%',
          transition: 'top 0.5s ease-in-out',
          zIndex: 200,
          flexWrap: 'nowrap',
        }}
        h={60}
        px={14}
        mb={20}
        spacing={0}
      >
        <Center css={{ gap: 4 }}>
          <UnstyledButton
            onClick={() => {
              console.log('back to voteLists');
            }}
          >
            <img src="/icons/icon_back.svg" alt="icon_back" />
          </UnstyledButton>
          <span css={{ fontSize: 22, fontWeight: 600 }}>투표</span>
        </Center>
        <ShareButton onClick={() => console.log('shareButton')} />
      </Group>
    </>
  );
}

export default VoteDetailHeader;
