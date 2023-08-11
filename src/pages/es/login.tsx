import Layout from '@/components/organisms/Layout';
import { NavBarText_ESP, FooterText_ESP, LoginPageText_ESP } from '@/texts/es';
import LoginTemplate from '@/components/templates/LoginTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <LoginTemplate texts={LoginPageText_ESP} />
    </Layout>
  );
};

export default faq;
