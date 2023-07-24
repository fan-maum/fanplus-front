import { HTMLAttributes } from 'react';
import { UnstyledButton } from './UnstyledButton';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

function ShareButton({ ...props }: Props) {
  return (
    <UnstyledButton w={32} h={32} bg="#F2F4F5" css={{ borderRadius: 9999 }} {...props}>
      <img css={{ verticalAlign: 'middle' }} src="/icons/icon_share.svg" alt="icon_share" />
    </UnstyledButton>
  );
}

export default ShareButton;
