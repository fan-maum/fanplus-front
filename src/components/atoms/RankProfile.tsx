import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { Stack } from './Stack';

export interface RankProfileProps extends HTMLAttributes<HTMLButtonElement> {
  flex?: React.CSSProperties['flex'];
  align?: React.CSSProperties['alignItems'];
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
  color?: React.CSSProperties['color'];
}

export default function RankProfile({
  flex,
  align,
  fontSize,
  fontWeight,
  color,
  children,
  ...props
}: RankProfileProps) {
  return (
    <Stack
      spacing={6}
      maw={'33.33333%'}
      css={[
        { 
          flex: flex || 1,
          alignItems: align || 'center',
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
