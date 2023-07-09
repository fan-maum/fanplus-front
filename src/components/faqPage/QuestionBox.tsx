import { useState } from 'react';
import styles from './styles/QuestionBox.module.css';

const QuestionBox = ({
  question,
  answer,
  twitter,
}: {
  question: string;
  answer: string;
  twitter?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.questionBox} onClick={handleClick}>
        <h3>{question}</h3>
        <img src="/icons/icon_down.svg" className={isOpen ? styles.reverse : styles.original} />
      </div>
      <div className={isOpen ? styles.opened : styles.closed}>
        <p>{answer}</p>
        {twitter && (
          <a href="https://twitter.com/fanplus_app?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
            {twitter}
          </a>
        )}
      </div>
    </div>
  );
};

export default QuestionBox;
