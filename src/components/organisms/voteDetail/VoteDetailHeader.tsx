import ShareButton from '@/components/atoms/ShareButton';
import { Group } from '@/components/atoms/Group';
import { Center } from '@/components/atoms/Center';
import { isMobile } from 'react-device-detect';
import { useRecoilState } from 'recoil';
import { voteDetailLangState } from '@/store/voteLangState';
import { GetLanguage } from '@/hooks/useLanguage';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useCopiedText } from '@/hooks/useCopyText';
import { useEndText, useMiddleText, useTitleText } from '@/store/shareContent';
import BackButton from '@/components/atoms/BackButton';
import { useRouter } from 'next/router';

export interface VoteDetailHeaderProps {
  voteTitle: string;
  confirmModalOpened: () => void;
}

function VoteDetailHeader({ voteTitle, confirmModalOpened, ...props }: VoteDetailHeaderProps) {
  const router = useRouter();
  const language = GetLanguage();
  const voteDetailLanguage = useRecoilState(voteDetailLangState(language))[0];
  const canShare = isMobile && navigator.share;
  const titleText = useTitleText(voteTitle, null);
  const middleText = useMiddleText(null, null, null, null, null, null, null);
  const endText = useEndText(null);
  const { text, url } = useCopiedText(null, titleText, middleText, endText);
  const copyText = `${text}\n\n${url}`;

  const shareOnClick = () => {
    if (canShare) {
      window.navigator?.share({
        title: '팬플러스 투표 공유',
        text,
        url,
      });
    } else {
      confirmModalOpened();
    }
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
          <BackButton onClick={() => router.back()} />
          <span css={{ fontSize: 22, fontWeight: 600 }}>{voteDetailLanguage?.vote}</span>
        </Center>
        <CopyToClipboard text={copyText}>
          <ShareButton onClick={shareOnClick} />
        </CopyToClipboard>
      </Group>
    </>
  );
}

export default VoteDetailHeader;
