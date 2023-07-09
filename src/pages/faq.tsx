import FAQText_KR from '@/components/faqPage/texts/KR';
import FAQ from '@/components/faqPage/FAQ';
import Layout from '@/components/layout/Layout';
import NavBarText_KR from '@/components/layout/texts/KR';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_KR}>
      <FAQ texts={FAQText_KR} />
    </Layout>
  );
};

export default faq;
