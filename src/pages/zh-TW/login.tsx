import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_TW, FooterText_zh_TW, LoginPageText_zh_TW } from '@/texts/zh-TW';
import LoginTemplate from '@/components/templates/LoginTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <LoginTemplate texts={LoginPageText_zh_TW} />
    </Layout>
  );
};

export default faq;
