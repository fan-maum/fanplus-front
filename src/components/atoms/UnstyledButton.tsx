import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { ButtonHTMLAttributes } from 'react';

export interface UnstyledButtonProps extends DefaultProps<ButtonHTMLAttributes<HTMLButtonElement>> {
  children?: React.ReactNode;
  size?: number;
}

export function UnstyledButton({ ...props }: UnstyledButtonProps) {
  return (
    <button
      css={[
        {
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer',
          border: 0,
          padding: 0,
          appearance: 'none',
          backgroundColor: 'transparent',
          textDecoration: 'none',
        },
        getDefaultProps<ButtonHTMLAttributes<HTMLButtonElement>>(props),
      ]}
      {...props}
    />
  );
}
