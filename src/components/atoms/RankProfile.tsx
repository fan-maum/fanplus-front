import { getDefaultProps } from '@/styles/DefaultProps';
import { HTMLAttributes } from 'react';
import { Stack } from './Stack';

export interface RankProfileProps extends HTMLAttributes<HTMLButtonElement> {
  flex?: React.CSSProperties['flex'];
  flexDirection?: React.CSSProperties['flexDirection'];
  align?: React.CSSProperties['alignItems'];
  maxHeight?: React.CSSProperties['maxHeight'];
  maxWidth?: React.CSSProperties['maxWidth'];
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
  color?: React.CSSProperties['color'];
}

export default function RankProfile({
  flex,
  flexDirection,
  align,
  maxHeight,
  maxWidth,
  fontSize,
  fontWeight,
  color,
  children,
  ...props
}: RankProfileProps) {
  return (
    <Stack
      css={[
        {
          width: 'fit-content',
          maxHeight: maxHeight || '',
          maxWidth: maxWidth || '',
          wordBreak: 'keep-all',
          flex: flex || 1,
          justifyContent: 'center',
          alignItems: align || 'center',
          fontSize: fontSize || 14,
          fontWeight: fontWeight || 400,
          color: color || '#343A40',
          textAlign: 'center',
        },
        getDefaultProps(props),
      ]}
    >
      <Stack spacing={6} direct={flexDirection || 'column'} align="center">
        {children}
      </Stack>
    </Stack>
  );
}
