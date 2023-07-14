import QuestionBox from './QuestionBox';
import { useState } from 'react';
import { FAQPageTextType } from '@/types/textTypes';
import FAQNavBar from './FAQNavBar';
import { Stack } from '../atoms/Stack';
import { Center } from '../atoms/Center';

export type QuestionType = 'All' | 'Vote' | 'Photos' | 'Fanfic' | 'Accounts';

const FAQ = ({ texts }: { texts: FAQPageTextType }) => {
  const [questionType, setQuestionType] = useState<QuestionType>('All');
  const showAll = questionType === 'All';
  const showVote = questionType === 'Vote' || questionType === 'All';
  const showPhotos = questionType === 'Photos' || questionType === 'All';
  const showFanfic = questionType === 'Fanfic' || questionType === 'All';
  const showAccounts = questionType === 'Accounts' || questionType === 'All';

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
      <div css={{ maxWidth: '936px', width: '100%' }}>
        <FAQNavBar texts={texts} questionType={questionType} setQuestionType={setQuestionType} />
        <div css={{ padding: '20px 10px' }}>
          {showAll && <QuestionBox question={texts.q1} answer={texts.a1} />}
          {showVote && (
            <>
              <QuestionBox question={texts.q2} answer={texts.a2} />
              <QuestionBox question={texts.q3} answer={texts.a3} />
              <QuestionBox question={texts.q4} answer={texts.a4} twitter={texts.twitter} />
            </>
          )}
          {showPhotos && <QuestionBox question={texts.q5} answer={texts.a5} />}
          {showFanfic && (
            <>
              <QuestionBox question={texts.q6} answer={texts.a6} />
              {texts.q7 && <QuestionBox question={texts.q7} answer={texts.a7} />}
            </>
          )}
          {showAccounts && (
            <>
              <QuestionBox question={texts.q8} answer={texts.a8} />
              <QuestionBox question={texts.q9} answer={texts.a9} />
            </>
          )}
        </div>
      </div>
    </Stack>
  );
};

export default FAQ;
