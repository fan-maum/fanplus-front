import { Stack } from '@/components/atoms';
import CopyToClipboard from 'react-copy-to-clipboard';

const href = 'http://localhost:3020/ko/community/board/160/6656989/';

const handleCopyClipBoard = (href: string) => {
  // eslint-disable-next-line no-console
  console.log(href);
};

const PostDetailCopyUrl = () => {
  return (
    <Stack direct="row" justify="flex-end">
      <span className="link">{href}</span>
      <CopyToClipboard text={href} onCopy={() => handleCopyClipBoard(href)}>
        <button className="link-copy">주소복사</button>
      </CopyToClipboard>
    </Stack>
  );
};
export default PostDetailCopyUrl;
