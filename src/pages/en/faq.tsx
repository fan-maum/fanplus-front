import Layout from '@/components/layout/Layout';
import { NavBarText_ENG, FooterText_ENG, FAQText_ENG } from '@/texts/en';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_ENG} footerTexts={FooterText_ENG}>
      <FAQTemplate texts={FAQText_ENG} />
    </Layout>
  );
};

export default faq;
