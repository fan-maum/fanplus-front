import Layout from '@/components/organisms/Layout';
import { NavBarText_VIE, FooterText_VIE, SignUpPageText_VIE } from '@/texts/vi';
import SignUpTemplate from '@/components/templates/SignUpTemplate';

const signUp = () => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <SignUpTemplate texts={SignUpPageText_VIE} />
    </Layout>
  );
};

export default signUp;
