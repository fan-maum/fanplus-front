import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_CN, FooterText_zh_CN, LoginPageText_zh_CN } from '@/texts/zh-CN';
import LoginTemplate from '@/components/templates/LoginTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <LoginTemplate texts={LoginPageText_zh_CN} />
    </Layout>
  );
};

export default faq;
