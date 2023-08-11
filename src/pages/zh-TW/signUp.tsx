import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_TW, FooterText_zh_TW, SignUpPageText_zh_TW } from '@/texts/zh-TW';
import SignUpTemplate from '@/components/templates/SignUpTemplate';

const signUp = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <SignUpTemplate texts={SignUpPageText_zh_TW} />
    </Layout>
  );
};

export default signUp;
