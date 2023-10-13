import { faqPageTexts } from '@/texts/faqPageTexts';
import type { UrlLangType } from '@/types/common';
import { Center } from '../atoms/Center';
import { Stack } from '../atoms/Stack';
import FAQContent from '../organisms/FAQContent';

const FAQTemplate = ({ urlLang }: { urlLang: UrlLangType }) => {
  const texts = faqPageTexts[urlLang];
  return (
    <Stack
      align="center"
      css={{
        padding: '100px 0px',
        '@media screen and (max-width: 991px)': {
          padding: '80px 10px 100px',
        },
      }}
    >
      <Center css={{ flexDirection: 'column', marginBottom: 20 }}>
        <img
          css={{ width: '30px', height: '30px', marginBottom: '20px' }}
          src="/icons/icon_question_mark.svg"
        />
        <h1 css={{ margin: '40px 0px', fontSize: '36px' }}>{texts.header}</h1>
      </Center>
      <FAQContent texts={texts} />
    </Stack>
  );
};

export default FAQTemplate;
