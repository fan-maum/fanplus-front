import Layout from '@/components/organisms/Layout';
import FullEditor from '@/editor/screen/FullEditor';
import LiteEditor from '@/editor/screen/LiteEditor';
import { FooterText_KR, NavBarText_KR } from '@/texts/ko';
import { useRef } from 'react';

const write = () => {
  const editorRef = useRef();
  const editorId = 'postEditor';

  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      {/* <FullEditor editorRef={editorRef} editorId={editorId} /> */}
      <LiteEditor editorRef={editorRef} editorId={editorId} />
    </Layout>
  );
};

export default write;
