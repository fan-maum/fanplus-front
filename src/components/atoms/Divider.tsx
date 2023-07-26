import { DefaultProps } from '@/styles/DefaultProps';

export interface DividerProps extends DefaultProps {
  size?: number;
}

export function Divider({ size = 1, ...props }: DividerProps) {
  return (
    <div
      css={{
        borderWidth: `${size}px 0px 0px`,
        borderStyle: 'initial',
        borderImage: 'initial',
        borderCollapse: 'initial',
        borderTopColor: '#F2F4F5',
        borderTopStyle: 'solid',
      }}
      {...props}
    />
  );
}
