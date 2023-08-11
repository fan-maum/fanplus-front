import Layout from '@/components/organisms/Layout';
import { NavBarText_IND, FooterText_IND, SignUpPageText_IND } from '@/texts/in';
import SignUpTemplate from '@/components/templates/SignUpTemplate';

const signUp = () => {
  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <SignUpTemplate texts={SignUpPageText_IND} />
    </Layout>
  );
};

export default signUp;
