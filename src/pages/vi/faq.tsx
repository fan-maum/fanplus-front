import Layout from '@/components/organisms/Layout';
import { NavBarText_VIE, FooterText_VIE, FAQText_VIE } from '@/texts/vi';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <FAQTemplate texts={FAQText_VIE} />
    </Layout>
  );
};

export default faq;
