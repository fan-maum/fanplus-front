import Layout from '@/components/organisms/Layout';
import { NavBarText_KR, FooterText_KR, LoginPageText_KR } from '@/texts/ko';
import LoginTemplate from '@/components/templates/LoginTemplate';

const login = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <LoginTemplate texts={LoginPageText_KR} />
    </Layout>
  );
};

export default login;
