import Layout from '@/components/organisms/Layout';
import { NavBarText_VIE, FooterText_VIE, LoginPageText_VIE } from '@/texts/vi';
import LoginTemplate from '@/components/templates/LoginTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <LoginTemplate texts={LoginPageText_VIE} />
    </Layout>
  );
};

export default faq;
