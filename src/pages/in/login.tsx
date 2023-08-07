import Layout from '@/components/organisms/Layout';
import { NavBarText_IND, FooterText_IND, LoginPageText_IND } from '@/texts/in';
import LoginTemplate from '@/components/templates/LoginTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <LoginTemplate texts={LoginPageText_IND} />
    </Layout>
  );
};

export default faq;
