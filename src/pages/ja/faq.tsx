import FAQ from '@/components/faqPage/FAQPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_JAP, FooterText_JAP, FAQText_JAP } from '@/texts/ja';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <FAQ texts={FAQText_JAP} />
    </Layout>
  );
};

export default faq;
