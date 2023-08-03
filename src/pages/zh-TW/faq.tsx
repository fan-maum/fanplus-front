import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_TW, FooterText_zh_TW, FAQText_zh_TW } from '@/texts/zh-TW';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <FAQTemplate texts={FAQText_zh_TW} />
    </Layout>
  );
};

export default faq;
