import { HTMLAttributes } from 'react';
import { UnstyledButton } from './UnstyledButton';
import { colors } from '@/styles/CommunityColors';
import { SetterOrUpdater } from 'recoil';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  seeSideBarText: string;
  setOpenSidebar: SetterOrUpdater<boolean>;
}

function OpenSideBardButton({ seeSideBarText, setOpenSidebar, ...props }: Props) {
  return (
    <UnstyledButton
      css={{
        dispaly: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6px 8px',
        height: '28px',
        backgroundColor: colors.gray[100],
        color: colors.gray[1000],
        fontSize: '14px',
        borderRadius: '6px',
        fontWeight: 600,
      }}
      onClick={() => setOpenSidebar(true)}
    >
      {seeSideBarText}
    </UnstyledButton>
  );
}

export default OpenSideBardButton;
