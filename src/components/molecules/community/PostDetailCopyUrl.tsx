import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack, UnstyledButton } from '@/components/atoms';
import CopyToClipboard from 'react-copy-to-clipboard';
import ToastModal from '@/components/toast/ToastModal';
import useCopyUrl from '@/hooks/useCopyUrl';
import { CommunityPostTextType } from '@/types/textTypes';

interface PostDetailCopyUrlProps {
  texts: CommunityPostTextType;
}
const PostDetailCopyUrl = ({ texts }: PostDetailCopyUrlProps) => {
  const router = useRouter();
  const [isCopy, onCopy] = useCopyUrl();

  const clientURL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const path = router.asPath.slice(1);
  const href = `${clientURL}${path}`;

  const handleCopyClipBoard = async (href: string) => {
    await onCopy(href);
  };

  useEffect(() => {
    isCopy && ToastModal.alert(texts.copyUrlMessage);
  }, [isCopy]);

  return (
    <Stack
      direct="row"
      justify="flex-end"
      align="center"
      pt={10}
      spacing={10}
      css={{ '@media(max-width:768px)': { display: 'none' } }}
    >
      <span
        css={{
          color: '#58555c',
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        {href}
      </span>
      <CopyToClipboard text={href} onCopy={() => handleCopyClipBoard(href)}>
        <UnstyledButton
          h={26}
          p={'1px 8px'}
          bg="#f1f1f1"
          css={{
            borderRadius: 6,
            color: '#101010',
            fontSize: 12,
            fontWeight: 600,
            lineHeight: '14px',
          }}
        >
          {texts.copyUrlButton}
        </UnstyledButton>
      </CopyToClipboard>
    </Stack>
  );
};
export default PostDetailCopyUrl;
