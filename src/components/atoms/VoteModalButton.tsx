import { colors } from '@/styles/Colors';
import { ButtonHTMLAttributes, useEffect } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonId?: string;
  variant?: 'primary' | 'secondary';
}

export function VoteModalButton({ buttonId, variant = 'secondary', ...props }: Props) {
  return (
    <button
      id={buttonId}
      css={{
        outline: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background .2s ease,color .1s ease',
        fontWeight: 700,
        lineHeight: '26px',
        fontSize: '18px',
        padding: '19px 6%',
        ...TYPE_VARIANTS[variant],
      }}
      {...props}
    />
  );
}

const TYPE_VARIANTS = {
  primary: {
    color: '#fff',
    background: colors.gradient[5],
    border: '0 solid transparent',
    // '&:hover': {
    //   background: #fff,
    // },
  },
  secondary: {
    color: '#666',
    background: '#fff',
    border: '1px solid #D9D9D9',
    // '&:hover': {
    //   background: colors.grey300,
    // },
  },
};
