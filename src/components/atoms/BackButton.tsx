import { HTMLAttributes } from 'react';
import { UnstyledButton } from './UnstyledButton';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

function BackButton({ ...props }: Props) {
  return (
    <UnstyledButton w={24} h={24} css={{ position: 'relative' }} {...props}>
      <img
        src="/icons/icon_back.svg"
        alt="icon_backArrow"
        css={{ padding: 4, verticalAlign: 'middle' }}
      />
    </UnstyledButton>
  );
}

export default BackButton;
