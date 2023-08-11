import Layout from '@/components/organisms/Layout';
import { NavBarText_JAP, FooterText_JAP, SignUpPageText_JAP } from '@/texts/ja';
import SignUpTemplate from '@/components/templates/SignUpTemplate';

const signUp = () => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <SignUpTemplate texts={SignUpPageText_JAP} />
    </Layout>
  );
};

export default signUp;
