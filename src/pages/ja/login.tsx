import Layout from '@/components/organisms/Layout';
import { NavBarText_JAP, FooterText_JAP, LoginPageText_JAP } from '@/texts/ja';
import LoginTemplate from '@/components/templates/LoginTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <LoginTemplate texts={LoginPageText_JAP} />
    </Layout>
  );
};

export default faq;
