import Layout from '@/components/organisms/Layout';
import { NavBarText_IND, FooterText_IND, FAQText_IND } from '@/texts/in';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <FAQTemplate texts={FAQText_IND} />
    </Layout>
  );
};

export default faq;
