import styles from './styles/FAQPage.module.css';
import QuestionBox from './QuestionBox';
import { useState } from 'react';
import { FAQPageTextType } from '@/types/textTypes';
import FAQNavBar from './FAQNavBar';

export type QuestionType = 'All' | 'Vote' | 'Photos' | 'Fanfic' | 'Accounts';

const FAQ = ({ texts }: { texts: FAQPageTextType }) => {
  const [questionType, setQuestionType] = useState<QuestionType>('All');
  const showAll = questionType === 'All';
  const showVote = questionType === 'Vote' || questionType === 'All';
  const showPhotos = questionType === 'Photos' || questionType === 'All';
  const showFanfic = questionType === 'Fanfic' || questionType === 'All';
  const showAccounts = questionType === 'Accounts' || questionType === 'All';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/icons/icon_question_mark.svg" />
        <h1>{texts.header}</h1>
      </div>
      <div className={styles.questionContainer}>
        <FAQNavBar texts={texts} questionType={questionType} setQuestionType={setQuestionType} />
        <div className={styles.questions}>
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
    </div>
  );
};

export default FAQ;
