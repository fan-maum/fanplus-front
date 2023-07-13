import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { UnstyledButton } from './UnstyledButton';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export function Button({ ...props }: ButtonProps) {
  return (
    <UnstyledButton
      css={{
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 16,
        marginBottom: 20,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderStyle: 'none',
        backgroundColor: '#ff5656',
        transition: '0.3s ease-in-out',
        ':hover': {
          backgroundColor: '#f93838',
        },
      }}
      {...props}
    />
  );
}
