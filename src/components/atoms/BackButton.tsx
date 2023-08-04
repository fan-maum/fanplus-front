import { HTMLAttributes } from 'react';
import { UnstyledButton } from './UnstyledButton';
import Image from 'next/image';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

function BackButton({ ...props }: Props) {
  return (
    <UnstyledButton w={24} h={24} bg="#F2F4F5" css={{ position: 'relative' }} {...props}>
      <Image
        fill
        css={{ verticalAlign: 'middle' }}
        src="/icons/icon_share.svg"
        alt="icon_backArrow"
      />
    </UnstyledButton>
  );
}

export default BackButton;
