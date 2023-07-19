import Layout from '@/components/layout/Layout';
import { NavBarText_ESP, FooterText_ESP, FAQText_ESP } from '@/texts/es';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <FAQTemplate texts={FAQText_ESP} />
    </Layout>
  );
};

export default faq;
