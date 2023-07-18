import ServiceBox from './ServiceBox';
import LanguageContainer from './LanguageBox';
import { keyframes } from '@emotion/react';
import { useContext, useState, useEffect } from 'react';
import { SideBarContext } from './Layout';
import { SideBarContextType } from '@/types/contextTypes';
import { NavBarTextType } from '@/types/textTypes';

const SideBar = ({ texts }: { texts: NavBarTextType }) => {
  const { isSideBar, setIsSideBar } = useContext(SideBarContext) as SideBarContextType;
  const [animation, setAnimation] = useState<boolean>(true);
  useEffect(() => {
    let timeout;
    if (!animation) {
      timeout = setTimeout(() => {
        setIsSideBar(false);
      }, 270);
    }
    if (animation) {
      clearTimeout(timeout);
    }
  }, [animation]);
  useEffect(() => {
    if (isSideBar) {
      setAnimation(true);
    }
  }, [isSideBar]);

  const open = isSideBar && animation;

  return (
    <div
      onClick={() => setAnimation(false)}
      css={{
        width: '100%',
        height: '120%',
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: '10000',
        animation: open ? `${fadeIn} 0.3s ease-in-out` : `${fadeOut} 0.3s ease-in-out`,
      }}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        css={{
          width: '80%',
          maxWidth: '440px',
          minWidth: '240px',
          height: '100vh',
          backgroundColor: 'white',
          zIndex: '10000',
          animation: open ? `${slideRight} 0.3s ease-in-out` : `${slideLeft} 0.3s ease-in-out`,
          li: { borderBottom: '1px solid rgb(102,102,102)' },
        }}
      >
        <div
          css={{
            flexDirection: 'column',
            listStyleType: 'none',
            float: 'left',
            fontSize: '16px',
            fontWeight: '600',
            color: 'rgb(102,102,102)',
            textAlign: 'center',
            '@media(max-width:991px)': {
              width: '100%',
              padding: '12px 50px 12px 20px',
              borderBottom: '1px solid rgb(102,102,102)',
              fontSize: '13px',
            },
          }}
        >
          Menu
        </div>
        <ServiceBox title={texts.aboutUs} link={texts.link.aboutUs} />
        {texts.recruit && (
          <ServiceBox
            title={texts.recruit}
            link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
          />
        )}
        <ServiceBox title={texts.business} link={texts.link.business} />
        <ServiceBox title="FAQ" link={texts.link.faq} />
        <LanguageContainer language={texts.language} isVotePage={false} />
      </ul>
    </div>
  );
};

export default SideBar;

const fadeOut = keyframes`from {opacity: 1;} to {opacity: 0;}`;
const fadeIn = keyframes`from {opacity: 0;} to {opacity: 1;}`;
const slideRight = keyframes`from {transform: translateX(-240px);} to {transform: translateX(0px);}`;
const slideLeft = keyframes`from {transform: translateX(0px);} to {transform: translateX(-240px);}`;
