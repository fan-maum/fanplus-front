import Layout from '@/components/layout/Layout';
import { NavBarText_JAP, FooterText_JAP, FAQText_JAP } from '@/texts/ja';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <FAQTemplate texts={FAQText_JAP} />
    </Layout>
  );
};

export default faq;
