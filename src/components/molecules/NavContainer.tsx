import NavBox from '../atoms/NavBox';
import LanguageBox from '../molecules/LanguageBox';
import { NavBarTextType } from '@/types/textTypes';

const NavContainer = ({ texts, isVotePage }: { texts: NavBarTextType; isVotePage: boolean }) => {
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
      <ul css={{ padding: '10px', '@media(max-width:991px)': { padding: '7px' } }}>
        <NavBox title={texts.vote} link={texts.link.vote} />
        {/* <PageBox title={texts.community} link={texts.link.community} /> */}
      </ul>
      {isVotePage ? (
        <ul css={{ padding: '10px', '@media(max-width:991px)': { padding: '7px' } }}>
          <LanguageBox language={texts.language} isVotePage={true} />
        </ul>
      ) : (
        <ul
          css={{ padding: '10px', '@media(max-width:991px)': { padding: '7px', display: 'none' } }}
        >
          <NavBox title={texts.aboutUs} link={texts.link.aboutUs} isSide />
          {texts.recruit && (
            <NavBox
              title={texts.recruit}
              link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
              isSide
            />
          )}
          <NavBox title={texts.business} link={texts.link.business} isSide />
          <NavBox title="FAQ" link={texts.link.faq} isSide />
          <LanguageBox language={texts.language} isVotePage={false} />
        </ul>
      )}
    </div>
  );
};

export default NavContainer;