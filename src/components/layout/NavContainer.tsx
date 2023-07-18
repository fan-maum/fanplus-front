import PageBox from './PageBox';
import ServiceBox from './ServiceBox';
import LanguageBox from './LanguageBox';
import { NavBarTextType } from '@/types/textTypes';

const NavContainer = ({ texts }: { texts: NavBarTextType }) => {
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
        <PageBox title={texts.vote} link={texts.link.vote} />
        {/* <PageBox title={texts.community} link={texts.link.community} /> */}
      </ul>
      <ul css={{ padding: '10px', '@media(max-width:991px)': { padding: '7px', display: 'none' } }}>
        <ServiceBox title={texts.aboutUs} link={texts.link.aboutUs} />
        {texts.recruit && (
          <ServiceBox
            title={texts.recruit}
            link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
          />
        )}
        <ServiceBox title={texts.business} link={texts.link.business} />
        <ServiceBox title="FAQ" link={texts.link.faq} />
        <LanguageBox language={texts.language} isVotePage={false} />
      </ul>
    </div>
  );
};

export default NavContainer;
