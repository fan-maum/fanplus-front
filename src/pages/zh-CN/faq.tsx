import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_CN, FooterText_zh_CN, FAQText_zh_CN } from '@/texts/zh-CN';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <FAQTemplate texts={FAQText_zh_CN} />
    </Layout>
  );
};

export default faq;
