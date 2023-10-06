import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Stack } from '@/components/atoms';
import CopyToClipboard from 'react-copy-to-clipboard';
import ToastModal from '@/components/toast/toastModal';

const PostDetailCopyUrl = () => {
  const router = useRouter();
  //   const { clientBaseURL } = useEnv();
  const [isCopy, onCopy] = useState();
  //   const [isCopy, onCopy] = useCopyClipBoard();

  const clientURL = process.env.NEXT_PUBLIC_CLIENT_URL;
  const path = router.asPath;
  const href = `${clientURL}${path}`;
  console.log(href);

  const handleCopyClipBoard = async (href: string) => {
    // eslint-disable-next-line no-console
    console.log(href);
    await onCopy(href);
  };

  useEffect(() => {
    isCopy && ToastModal.alert('게시글 주소를 복사하였습니다.');
  }, [isCopy]);

  return (
    <Stack direct="row" justify="flex-end" align="center">
      <span>{href}</span>
      <CopyToClipboard text={href} onCopy={() => handleCopyClipBoard(href)}>
        <button>주소복사</button>
      </CopyToClipboard>
    </Stack>
  );
};
export default PostDetailCopyUrl;

// const StyledWrapper = styled.div`
//   .link {
//     font-size: 14px;
//     color: var(--color-text-secondary);
//     padding-right: 12px;
//   }

//   > button {
//     background: var(--color-gray-background);
//     border-radius: 3px;
//     padding: 6px 8px;
//     transition: 0.2s;

//     &:hover {
//       background: var(--color-button-background);
//     }
//   }

//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// const CopyUrl = styled.
