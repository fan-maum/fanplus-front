import MainLogo from '../atoms/MainLogo';
import NavContainer from './NavContainer';
import { useContext } from 'react';
import { SideBarContext } from '../organisms/Layout';
import { SideBarContextType } from '@/types/contextTypes';
import { NavBarTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';

const NavBar = ({ texts }: { texts: NavBarTextType }) => {
  const { setIsSideBarOpen } = useContext(SideBarContext) as SideBarContextType;
  const router = useRouter();
  const page = router.pathname.split('/')[2];
  const isVoteCommunityPage = page === 'votes' || page === 'voteDetail' || page === 'community';
  const isLoginSignUpPage = page === 'login' || page === 'signUp';

  return (
    <>
      <nav
        css={{
          width: '100%',
          position: 'fixed',
          backgroundColor: isVoteCommunityPage ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.8)',
          zIndex: '1000',
          borderBottom: '1px solid #d9d9d9',
          '@media(max-width:768px)': {
            display: isLoginSignUpPage ? 'none' : 'block',
          },
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
          <NavContainer texts={texts} isVoteCommunityPage={isVoteCommunityPage} />
          {!isVoteCommunityPage && (
            <img
              src="/icons/사이드바.svg"
              onClick={() => setIsSideBarOpen(true)}
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
      </nav>
      {/* background용 div */}
      {!isLoginSignUpPage && (
        <div
          css={{ width: '100%', height: '100px', '@media(max-width:991px)': { height: '80px' } }}
        />
      )}
    </>
  );
};
export default NavBar;
