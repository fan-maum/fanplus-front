import Layout from '@/components/layout/Layout';
import { NavBarText_zh_rTW, FooterText_zh_rTW, FAQText_zh_rTW } from '@/texts/zh-rTW';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_rTW} footerTexts={FooterText_zh_rTW}>
      <FAQTemplate texts={FAQText_zh_rTW} />
    </Layout>
  );
};

export default faq;
