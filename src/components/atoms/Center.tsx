import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { HTMLAttributes } from 'react';

export interface CenterProps extends HTMLAttributes<HTMLDivElement>, DefaultProps {}

export function Center({ ...props }: CenterProps) {
  return (
    <div
      css={[
        { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        getDefaultProps(props),
      ]}
      {...props}
    />
  );
}
