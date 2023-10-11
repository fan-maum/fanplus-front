import Layout from '@/components/organisms/Layout';
import { NavBarText_KR, FooterText_KR, SignUpPageText_KR } from '@/texts/ko';
import SignUpTemplate from '@/components/templates/SignUpTemplate';

const signUp = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <SignUpTemplate texts={SignUpPageText_KR} />
    </Layout>
  );
};

export default signUp;
