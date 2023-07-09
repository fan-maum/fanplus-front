import FAQText_ENG from '@/components/faqPage/texts/ENG';
import FAQ from '@/components/faqPage/FAQ';
import Layout from '@/components/layout/Layout';
import NavBarText_ENG from '@/components/layout/texts/ENG';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG}>
      <FAQ texts={FAQText_ENG} />
    </Layout>
  );
};

export default faq;
