import { FAQPageTextType } from '@/types/textTypes';
import styles from './styles/FAQNavBar.module.css';
import { QuestionType } from './FAQ';
import { Dispatch, SetStateAction } from 'react';

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
    <div className={styles.navBar}>
      <div
        className={
          questionType === 'All'
            ? `${styles.selectedQuestionType} ${styles.questionType}`
            : styles.questionType
        }
        onClick={() => setQuestionType('All')}
      >
        <h2>{texts.navBar.all}</h2>
      </div>
      <div
        className={
          questionType === 'Vote'
            ? `${styles.selectedQuestionType} ${styles.questionType}`
            : styles.questionType
        }
        onClick={() => setQuestionType('Vote')}
      >
        <h2>{texts.navBar.vote}</h2>
      </div>
      <div
        className={
          questionType === 'Photos'
            ? `${styles.selectedQuestionType} ${styles.questionType}`
            : styles.questionType
        }
        onClick={() => setQuestionType('Photos')}
      >
        <h2>{texts.navBar.photos}</h2>
      </div>
      <div
        className={
          questionType === 'Fanfic'
            ? `${styles.selectedQuestionType} ${styles.questionType}`
            : styles.questionType
        }
        onClick={() => setQuestionType('Fanfic')}
      >
        <h2>{texts.navBar.fanfic}</h2>
      </div>
      <div
        className={
          questionType === 'Accounts'
            ? `${styles.selectedQuestionType} ${styles.questionType}`
            : styles.questionType
        }
        onClick={() => setQuestionType('Accounts')}
      >
        <h2>{texts.navBar.accounts}</h2>
      </div>
    </div>
  );
};

export default FAQNavBar;
