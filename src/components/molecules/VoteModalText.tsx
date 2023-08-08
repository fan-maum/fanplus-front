import { Group } from '@/components/atoms';
import Chip from '@/components/atoms/Chip';

export interface VoteModalTextProps {
  voteText: React.ReactNode;
  starName?: string;
}

const VoteModalText = ({ starName, voteText, ...props }: VoteModalTextProps) => {
  return (
    <>
      <Group spacing={6} position="center">
        <Chip>{starName}</Chip>
        <span css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>님에게</span>
      </Group>
      <span css={{ lineHeight: '26px', fontSize: 18, fontWeight: 400, color: '#475357' }}>
        {voteText}
      </span>
    </>
  );
};

export default VoteModalText;
