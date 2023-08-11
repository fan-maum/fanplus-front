import Layout from '@/components/organisms/Layout';
import { NavBarText_ESP, FooterText_ESP, SignUpPageText_ESP } from '@/texts/es';
import SignUpTemplate from '@/components/templates/SignUpTemplate';

const signUp = () => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <SignUpTemplate texts={SignUpPageText_ESP} />
    </Layout>
  );
};

export default signUp;
