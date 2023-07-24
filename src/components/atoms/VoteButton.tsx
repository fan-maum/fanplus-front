import { HTMLAttributes } from 'react';
import { UnstyledButton } from './UnstyledButton';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export function VoteButton({ ...props }: ButtonProps) {
  return (
    <UnstyledButton
      css={{
        padding: '7px 16px',
        fontSize: 17,
        fontWeight: 600,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#343A40',
        border: '1px solid #101010',
        transition: '0.3s ease-in-out',
      }}
      {...props}
    />
  );
}
