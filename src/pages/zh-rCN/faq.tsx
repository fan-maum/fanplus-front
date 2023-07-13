import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_zh_rCN, FooterText_zh_rCN, FAQText_zh_rCN } from '@/texts/zh-rCN';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_rCN} footerTexts={FooterText_zh_rCN}>
      <FAQ texts={FAQText_zh_rCN} />
    </Layout>
  );
};

export default faq;
