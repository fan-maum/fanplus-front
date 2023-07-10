import FAQText_ENG from '@/components/faqPage/texts/ENG';
import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import NavBarText_ENG from '@/components/layout/texts/ENG';
import { FooterText_KR } from '@/components/layout/texts/KR';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_KR}>
      <FAQ texts={FAQText_ENG} />
    </Layout>
  );
};

export default faq;
