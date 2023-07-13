import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_IND, FooterText_IND, FAQText_IND } from '@/texts/in';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <FAQ texts={FAQText_IND} />
    </Layout>
  );
};

export default faq;
