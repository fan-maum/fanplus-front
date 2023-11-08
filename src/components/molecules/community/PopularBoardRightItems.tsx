import IconDecreased from '@/components/atoms/IconDecreased';
import IconHyphen from '@/components/atoms/IconHyphen';
import IconIncreased from '@/components/atoms/IconIncreased';
import type { ReactNode } from 'react';

export const Increased = ({ rankChange }: { rankChange: number }) => {
  return (
    <ChangeInfo>
      <IconIncreased />
      <Difference color="#ff5656">{rankChange}</Difference>
    </ChangeInfo>
  );
};

export const Decreased = ({ rankChange }: { rankChange: number }) => {
  return (
    <ChangeInfo>
      <IconDecreased />
      <Difference color="#23a3ff">{rankChange}</Difference>
    </ChangeInfo>
  );
};

export const NoChange = () => {
  return (
    <ChangeInfo>
      <IconHyphen />
    </ChangeInfo>
  );
};

export const New = () => {
  return (
    <ChangeInfo>
      <span css={{ color: '#ff5656' }}>NEW</span>
    </ChangeInfo>
  );
};

const ChangeInfo = ({ children }: { children: ReactNode }) => {
  return (
    <span
      css={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        right: '15px',
        fontSize: '13px',
      }}
    >
      {children}
    </span>
  );
};

const Difference = ({ children, color }: { children: ReactNode; color: string }) => {
  return (
    <span css={{ color, lineHeight: '11px', fontWeight: 500, marginLeft: '2px' }}>{children}</span>
  );
};
