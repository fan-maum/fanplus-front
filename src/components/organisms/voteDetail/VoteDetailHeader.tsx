import ShareButton from '@/components/atoms/ShareButton';
import { Group } from '@/components/atoms/Group';
import { UnstyledButton } from '@/components/atoms/UnstyledButton';
import { Center } from '@/components/atoms/Center';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';
import { GetLanguage } from '@/hooks/useLanguage';
import CopyToClipboard from 'react-copy-to-clipboard';
import CompletedShareModal from '@/components/modals/CompletedShareModal';

export interface VoteDetailHeaderProps {
  voteTitle: string;
}

function VoteDetailHeader({ voteTitle, ...props }: VoteDetailHeaderProps) {
  const router = useRouter();
  const language = GetLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  const shareOnClick = () => {
    // eslint-disable-next-line no-console
    console.log('share on clicked');
  };
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
        {/* <CopyToClipboard text={copyText}> */}
        <ShareButton onClick={shareOnClick} />
        {/* </CopyToClipboard> */}
      </Group>
    </>
  );
}

export default VoteDetailHeader;
