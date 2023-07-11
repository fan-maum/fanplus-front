import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_KR, FooterText_KR, FAQText_KR } from '@/texts/ko';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <FAQ texts={FAQText_KR} />
    </Layout>
  );
};

export default faq;
