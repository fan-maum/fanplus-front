import NavBox from '../atoms/NavBox';
import LanguageBox from '../molecules/LanguageBox';
import { NavBarTextType } from '@/types/textTypes';

const NavContainer = ({
  texts,
  isVoteCommunityPage,
}: {
  texts: NavBarTextType;
  isVoteCommunityPage: boolean;
}) => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: '1',
        flexShrink: '1',
      }}
    >
      <ul css={{ padding: '10px', '@media(max-width:768px)': { padding: '2px' } }}>
        <NavBox title={texts.home} link={texts.link.home} />
        <NavBox title={texts.vote} link={texts.link.vote} />
        <NavBox title={texts.community} link={texts.link.community} />
      </ul>
      {isVoteCommunityPage ? (
        <ul
          css={{
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            '@media(max-width:991px)': { padding: '5px' },
          }}
        >
          <LanguageBox language={texts.language} isVoteCommunityPage={true} />
        </ul>
      ) : (
        <ul
          css={{
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            '@media(max-width:991px)': { padding: '5px', display: 'none' },
          }}
        >
          {texts.recruit && (
            <NavBox
              title={texts.recruit}
              link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
              isSide
            />
          )}
          <NavBox title={texts.business} link={texts.link.business} isSide />
          <NavBox title="FAQ" link={texts.link.faq} isSide />
          <LanguageBox language={texts.language} isVoteCommunityPage={false} />
        </ul>
      )}
    </div>
  );
};

export default NavContainer;
