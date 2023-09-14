import { colors } from '@/styles/Colors';
import { ButtonHTMLAttributes, useEffect } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonId?: string;
  variant?: 'primary' | 'secondary';
}

export function CommunityModalButton({ buttonId, variant = 'secondary', ...props }: Props) {
  return (
    <button
      id={buttonId}
      css={{
        outline: 'none',
        cursor: 'pointer',
        transition: 'background .2s ease,color .1s ease',
        lineHeight: '26px',
        fontSize: '18px',
        padding: '19px 6%',
        background: '#fff',
        ...TYPE_VARIANTS[variant],
      }}
      {...props}
    />
  );
}

const TYPE_VARIANTS = {
  primary: {
    color: '#FF5656',
    border: '1px solid #D9D9D9',
    borderRight: "0 solid transparent",
    borderLeft: "1px solid #D9D9D9",
    borderBottom: "1px solid #D9D9D9",
    borderTop: "1px solid #D9D9D9",
    fontWeight: 600,
  },
  secondary: {
    color: '#666',
    border: '1px solid #D9D9D9',
    fontWeight: 400,
  },
  tertiary: {
    color: '#23A3FF',
    border: '1px solid #D9D9D9',
    fontWeight: 600,
  },
};
