import ShareButton from '@/components/atoms/ShareButton';
import { Group } from '@/components/atoms/Group';
import { UnstyledButton } from '@/components/atoms/UnstyledButton';
import { Center } from '@/components/atoms/Center';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';
import { GetLanguage } from '@/hooks/useLanguage';

function VoteDetailHeader() {
  const router = useRouter();
  const language = GetLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
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
          <UnstyledButton onClick={() => router.back()}>
            <img src="/icons/icon_back.svg" alt="icon_back" />
          </UnstyledButton>
          <span css={{ fontSize: 22, fontWeight: 600 }}>{voteDetailLanguage?.vote}</span>
        </Center>
        <ShareButton
          onClick={() =>
            // eslint-disable-next-line no-console
            console.log('shareButton')
          }
        />
      </Group>
    </>
  );
}

export default VoteDetailHeader;
