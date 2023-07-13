import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_ESP, FooterText_ESP, FAQText_ESP } from '@/texts/es';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <FAQ texts={FAQText_ESP} />
    </Layout>
  );
};

export default faq;
