import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_VIE, FooterText_VIE, FAQText_VIE } from '@/texts/vi';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <FAQ texts={FAQText_VIE} />
    </Layout>
  );
};

export default faq;
