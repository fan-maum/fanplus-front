import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { FooterText_KR, NavBarText_KR } from '@/texts/ko';

const write = () => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <PostEditorTemplate />
    </Layout>
  );
};

export default write;
