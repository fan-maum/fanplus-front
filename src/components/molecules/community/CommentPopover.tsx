import { useState } from 'react';
import Image from 'next/image';
import IconHorizontalMore from '@/components/atoms/IconHorizontalMore';

type CommentPopoverProps = {
  children: React.ReactNode;
};

const CommentPopover = () => {
  const [visible, setVisible] = useState(false);
  const handleMenuVisible = async () => {
    if (visible) return removeEventListener();
    setVisible(true);
  };

  const removeEventListener = () => {
    setVisible(false);
  };

  return (
    <div css={{ position: 'relative' }}>
      <IconHorizontalMore handleClickMore={handleMenuVisible} />
      {visible && (
        <ul css={{ position: 'absolute', border: '1px solid #232323' }}>
          <li>신고하기</li>
        </ul>
      )}
    </div>
    // <Popover/>
  );
};

export default CommentPopover;
