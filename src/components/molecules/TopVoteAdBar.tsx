import React, { HTMLAttributes, useEffect } from 'react';
import IconClose from '../atoms/IconClose';
import { Group } from '../atoms';
import { topNavHeight } from '@/global/constant';
import { useRecoilState } from 'recoil';
import { voteAdBannerState } from '@/store/voteLangState';
import { useUrlLanguage } from '@/hooks/useLanguage';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { getVoteCookie, setVoteCookie } from '@/utils/voteCookie';

interface Props extends HTMLAttributes<HTMLDivElement> {
  topAdBarState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dailyTicketCount: number;
}

function TopVoteAdBar({
  topAdBarState: [opened, setOpened],
  dailyTicketCount,
  style,
  ...props
}: Props) {
  const language = useUrlLanguage();
  const voteTopVoteAdLang = useRecoilState(voteAdBannerState(language))[0];
  let expire = dayjs().startOf('day').add(1, 'day').toDate();

  useEffect(() => {
    let TopVoteAdCount: number | undefined = getVoteCookie('TopVoteAdCount');
    if (TopVoteAdCount === undefined) {
      setVoteCookie('TopVoteAdCount', 0, { path: '/', expires: expire });
      TopVoteAdCount = 0;
    }
    if (TopVoteAdCount < 1) {
      setOpened(true);
    }
  }, []);

  const handleTopVoteBarClose = () => {
    setOpened(false);
    let TopVoteAdCount: number | undefined = getVoteCookie('TopVoteAdCount');
    setVoteCookie('TopVoteAdCount', Number(TopVoteAdCount) + 1, {
      path: '/',
      expires: expire,
    });
  };

  return (
    <Group
      position="center"
      css={{
        backgroundColor: '#FFC7D6',
        position: 'fixed',
        width: '100%',
        height: topNavHeight,
        top: opened ? 0 : -topNavHeight,
        transition: 'top 0.5s ease-in-out',
        right: 0,
        flexWrap: 'nowrap',
        padding: '14px 6px',
        display: opened ? 'flex' : 'none',
        alignItems: 'center',
        zIndex: 200,
        '@media screen and (max-width: 991px)': {
          height: topNavHeight + 20,
          top: opened ? 0 : -topNavHeight - 20,
        },
      }}
      style={style}
      pl={16}
      pr={22}
      spacing={0}
    >
      <TopBar>
        <div dangerouslySetInnerHTML={{ __html: voteTopVoteAdLang.message1 + '&nbsp;' }}></div>
        <div>{voteTopVoteAdLang.message2}</div>
      </TopBar>
      <div
        css={{ position: 'absolute', right: 30, width: 26, height: 26 }}
        onClick={handleTopVoteBarClose}
      >
        <IconClose strokeColor="#000" width="26" height="26" />
      </div>
    </Group>
  );
}

export default TopVoteAdBar;

const TopBar = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  & > div {
    display: inline-block;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
  span {
    font-weight: 700;
    color: #ff0045;
  }
`;
