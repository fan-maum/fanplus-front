import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { HTMLAttributes } from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement>, DefaultProps {
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  spacing?: React.CSSProperties['gap'];
  direct?: React.CSSProperties['flexDirection'];
}

export function Stack({ align, justify, spacing, direct, children, ...props }: StackProps) {
  return (
    <div
      css={[
        {
          display: 'flex',
          flexDirection: direct || 'column',
          alignItems: align,
          justifyContent: justify,
          gap: spacing,
        },
        getDefaultProps(props),
      ]}
      {...props}
    >
      {children}
    </div>
  );
}
