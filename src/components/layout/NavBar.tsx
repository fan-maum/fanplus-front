import MainLogo from './MainLogo';
import NavContainer from './NavContainer';
import { useContext } from 'react';
import { SideBarContext } from './Layout';
import { SideBarContextType } from '@/types/contextTypes';
import { NavBarTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import LanguageBox from './LanguageBox';

const NavBar = ({ texts }: { texts: NavBarTextType }) => {
  const { setIsSideBar } = useContext(SideBarContext) as SideBarContextType;
  const router = useRouter();
  const isVotePage = router.pathname.endsWith('votes');

  return (
    <>
      <div
        css={{
          width: '100%',
          position: 'fixed',
          backgroundColor: isVotePage ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.8)',
          zIndex: '9999',
        }}
      >
        <div
          css={{
            maxWidth: '1170px',
            height: '85px',
            margin: '0px auto',
            padding: '20px 5px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            '@media(max-width:991px)': { height: '70px' },
          }}
        >
          <MainLogo link={texts.link.aboutUs} />
          <NavContainer texts={texts} />
          {isVotePage ? (
            <ul css={{ display: 'none', '@media(max-width:991px)': { display: 'block' } }}>
              <LanguageBox language={texts.language} />
            </ul>
          ) : (
            <img
              src="/icons/사이드바.svg"
              onClick={() => setIsSideBar(true)}
              css={{
                display: 'none',
                width: '24px',
                height: '21px',
                marginRight: '15px',
                cursor: 'pointer',
                '@media(max-width:991px)': { display: 'block' },
              }}
            />
          )}
        </div>
      </div>
      {/* background용 div */}
      <div css={{ width: '100%', height: '85px', '@media(max-width:991px)': { height: '70px' } }} />
    </>
  );
};
export default NavBar;
