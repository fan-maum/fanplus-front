import FAQText_KR from '@/components/faqPage/texts/KR';
import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import NavBarText_KR, { FooterText_KR } from '@/components/layout/texts/KR';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <FAQ texts={FAQText_KR} />
    </Layout>
  );
};

export default faq;
