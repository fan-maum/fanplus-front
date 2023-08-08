import { DefaultProps } from '@/styles/DefaultProps';

export interface ChipProps extends DefaultProps {}

export default function Chip({ ...props }: ChipProps) {
  return (
    <div
      css={{
        color: '#475357',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 700,
        gap: 6,
      }}
      {...props}
    />
  );
}
