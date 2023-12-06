import React, { HTMLAttributes, useEffect } from 'react';
import IconClose from '../atoms/IconClose';
import { Group } from '../atoms';
import { topNavHeight } from '@/global/constant';

export interface TopAdBarProps {
  onButtonClick?: () => void;
}

interface Props extends TopAdBarProps, HTMLAttributes<HTMLDivElement> {
  topAdBarState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

function TopVoteAdBar({
  topAdBarState: [opened, setOpened],
  style,
  onButtonClick,
  ...props
}: Props) {
  useEffect(() => {
    if (!sessionStorage.getItem('top-notice-bar-close')) {
      setOpened(true);
    }
  }, []);

  return (
    <Group
      position="center"
      css={{
        backgroundColor: '#FFC7D6',
        position: 'fixed',
        width: '100%',
        height: '56px',
        top: opened ? 0 : -topNavHeight,
        transition: 'top 0.5s ease-in-out',
        right: 0,
        flexWrap: 'nowrap',
        padding: '14px 6px',
        display: opened ? 'flex' : 'none',
        alignItems: 'center',
        zIndex: 200,
      }}
      style={style}
      pl={16}
      pr={22}
      spacing={0}
    >
      <p>아래 투표에서 최애에게 매일 5표씩 무료로 투표하고 광고 선물하세요!</p>
      <div
        css={{ position: 'absolute', right: 30, width: 26, height: 26 }}
        onClick={() => {
          setOpened(false);
          sessionStorage.setItem('top-notice-bar-close', 'true');
        }}
      >
        <IconClose strokeColor="#000" width="26" height="26" />
      </div>
    </Group>
  );
}

export default TopVoteAdBar;
