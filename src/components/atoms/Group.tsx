import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';

export type GroupPosition = 'left' | 'center' | 'right' | 'apart';

export interface GroupProps extends HTMLAttributes<HTMLDivElement>, DefaultProps {
  position?: GroupPosition;
  noWrap?: boolean;
  grow?: boolean;
  spacing?: React.CSSProperties['gap'];
  align?: React.CSSProperties['alignItems'];
}

export function Group({
  children,
  position = 'left',
  noWrap,
  grow,
  spacing,
  align,
  ...props
}: GroupProps) {
  const alignStyle = css(
    position === 'left' || position === 'apart'
      ? {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: position === 'left' ? 'flex-start' : 'space-between',
        }
      : { flexFlow: 'row wrap', justifyContent: position === 'center' ? 'center' : 'flex-end' }
  );
  return (
    <div
      css={[
        {
          boxSizing: 'border-box',
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: align || 'center',
          gap: spacing,
        },
        alignStyle,
        getDefaultProps(props),
      ]}
      {...props}
    >
      {children}
    </div>
  );
}
