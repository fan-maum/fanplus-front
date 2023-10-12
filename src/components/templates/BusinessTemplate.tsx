import { businessPageTexts } from '@/texts/businesspageTexts';
import type { UrlLangType } from '@/types/common';
import { Center } from '../atoms/Center';
import BusinessForm from '../organisms/BusinessForm';
import BusinessInfo from '../organisms/BusinessInfo';

const BusinessTemplate = ({ urlLang }: { urlLang: UrlLangType }) => {
  const texts = businessPageTexts[urlLang];
  return (
    <Center
      css={{
        maxWidth: 1170,
        width: '100%',
        padding: 10,
        margin: '100px auto',
        wordBreak: 'keep-all',
        '@media screen and (max-width: 768px)': {
          flexDirection: 'column',
          margin: '0px',
          padding: '80px 15px 100px 15px',
        },
      }}
    >
      <BusinessInfo texts={texts} />
      <BusinessForm texts={texts} />
    </Center>
  );
};

export default BusinessTemplate;
