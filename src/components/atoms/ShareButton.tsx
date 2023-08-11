import { HTMLAttributes } from 'react';
import { UnstyledButton } from './UnstyledButton';
import Image from 'next/image';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

function ShareButton({ ...props }: Props) {
  return (
    <UnstyledButton
      w={32}
      h={32}
      bg="#F2F4F5"
      css={{ position: 'relative', borderRadius: 9999 }}
      {...props}
    >
      <Image
        fill
        css={{ padding: 8, verticalAlign: 'middle' }}
        src="/icons/icon_share.svg"
        alt="icon_share"
      />
    </UnstyledButton>
  );
}

export default ShareButton;
