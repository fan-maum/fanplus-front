import Layout from '@/components/organisms/Layout';
import { NavBarText_ENG, FooterText_ENG, LoginPageText_ENG } from '@/texts/en';
import LoginTemplate from '@/components/templates/LoginTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_ENG}>
      <LoginTemplate texts={LoginPageText_ENG} />
    </Layout>
  );
};

export default faq;
