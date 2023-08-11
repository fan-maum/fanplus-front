import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_CN, FooterText_zh_CN, SignUpPageText_zh_CN } from '@/texts/zh-CN';
import SignUpTemplate from '@/components/templates/SignUpTemplate';

const signUp = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <SignUpTemplate texts={SignUpPageText_zh_CN} />
    </Layout>
  );
};

export default signUp;
