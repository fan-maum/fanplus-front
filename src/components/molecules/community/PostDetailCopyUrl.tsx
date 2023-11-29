import { Stack, UnstyledButton } from '@/components/atoms';
import ToastModal from '@/components/toast/ToastModal';
import type { CommunityPostTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';

interface PostDetailCopyUrlProps {
  texts: CommunityPostTextType;
}
const PostDetailCopyUrl = ({ texts }: PostDetailCopyUrlProps) => {
  const router = useRouter();

  const clientURL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const path = router.asPath;
  const href = `${clientURL}${path}`;

  const handleCopy = () => {
    window?.navigator.clipboard.writeText(href).then(() => {
      ToastModal.alert(texts.copyUrlMessage);
    });
  };

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
        onClick={handleCopy}
      >
        {texts.copyUrlButton}
      </UnstyledButton>
    </Stack>
  );
};
export default PostDetailCopyUrl;
