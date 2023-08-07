import Layout from '@/components/organisms/Layout';
import { NavBarText_ENG, FooterText_ENG, SignUpPageText_ENG } from '@/texts/en';
import SignUpTemplate from '@/components/templates/SignUpTemplate';

const signUp = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_ENG}>
      <SignUpTemplate texts={SignUpPageText_ENG} />
    </Layout>
  );
};

export default signUp;
