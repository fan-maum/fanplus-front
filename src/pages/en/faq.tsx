import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_ENG, FooterText_ENG, FAQText_ENG } from '@/texts/en';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_ENG}>
      <FAQ texts={FAQText_ENG} />
    </Layout>
  );
};

export default faq;
