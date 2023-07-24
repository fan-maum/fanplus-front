import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { Stack } from './Stack';

export interface RankProfileProps extends HTMLAttributes<HTMLButtonElement> {
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
  color?: React.CSSProperties['color'];
}

export default function RankProfile({
  fontSize,
  fontWeight,
  color,
  children,
  ...props
}: RankProfileProps) {
  return (
    <Stack
      maw={'33.33333333%'}
      spacing={6}
      css={[
        {
          fontSize: fontSize || 14,
          fontWeight: fontWeight || 400,
          color: color || '#343A40',
          textAlign: 'center',
        },
        getDefaultProps(props),
      ]}
    >
      {children}
    </Stack>
  );
}
