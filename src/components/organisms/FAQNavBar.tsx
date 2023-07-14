import { FAQPageTextType } from '@/types/textTypes';
import { QuestionType } from './FAQContent';
import { Dispatch, SetStateAction } from 'react';
import { Stack } from '../atoms/Stack';
import FAQNavBarTitle from '../molecules/FAQNavBarTitle';

const FAQNavBar = ({
  texts,
  questionType,
  setQuestionType,
}: {
  texts: FAQPageTextType;
  questionType: QuestionType;
  setQuestionType: Dispatch<SetStateAction<QuestionType>>;
}) => {
  return (
    <Stack
      direct="row"
      css={{
        '@media screen and (max-width: 768px)': {
          alignItems: 'center',
          paddingLeft: 10,
        },
      }}
    >
      <FAQNavBarTitle
        selected={questionType === 'All'}
        title={texts.navBar.all}
        onClick={() => setQuestionType('All')}
      />
      <FAQNavBarTitle
        selected={questionType === 'Vote'}
        title={texts.navBar.vote}
        onClick={() => setQuestionType('Vote')}
      />
      <FAQNavBarTitle
        selected={questionType === 'Photos'}
        title={texts.navBar.photos}
        onClick={() => setQuestionType('Photos')}
      />
      <FAQNavBarTitle
        selected={questionType === 'Fanfic'}
        title={texts.navBar.fanfic}
        onClick={() => setQuestionType('Fanfic')}
      />
      <FAQNavBarTitle
        selected={questionType === 'Accounts'}
        title={texts.navBar.accounts}
        onClick={() => setQuestionType('Accounts')}
      />
    </Stack>
  );
};

export default FAQNavBar;
