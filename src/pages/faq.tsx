import Layout from '@/components/organisms/Layout';
import { NavBarText_KR, FooterText_KR, FAQText_KR } from '@/texts/ko';
import FAQTemplate from '@/components/templates/FAQTemplate';

const faq = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <FAQTemplate texts={FAQText_KR} />
    </Layout>
  );
};

export default faq;
