import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { ButtonHTMLAttributes } from 'react';

export interface UnstyledButtonProps extends DefaultProps<ButtonHTMLAttributes<HTMLButtonElement>> {
  buttonId?: string;
  children?: React.ReactNode;
  size?: number;
}

export function UnstyledButton({ buttonId, ...props }: UnstyledButtonProps) {
  return (
    <button
      id={buttonId}
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
