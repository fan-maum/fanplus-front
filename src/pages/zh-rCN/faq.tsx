import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_rCN, FooterText_zh_rCN, FAQText_zh_rCN } from '@/texts/zh-rCN';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_rCN} footerTexts={FooterText_zh_rCN}>
      <FAQTemplate texts={FAQText_zh_rCN} />
    </Layout>
  );
};

export default faq;
