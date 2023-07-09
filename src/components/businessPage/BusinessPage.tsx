import { BusinessPageTextType } from '@/types/textTypes';
import styles from './styles/BusinessPage.module.css';

const BusinessPage = ({ texts }: { texts: BusinessPageTextType }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${styles.box1}`}>
        <h1>{texts.title}</h1>
        <p>{texts.content}</p>
        <div className={styles.info}>
          <h4>Email</h4>
          <p className={styles.strong}>appfanplus@gmail.com</p>
          <h4>Address</h4>
          <p>{texts.address}</p>
        </div>
      </div>
      <div className={styles.box}>
        <form>
          <input placeholder={texts.form.company} required></input>
          <input placeholder={texts.form.officer} required></input>
          <input type="email" placeholder={texts.form.email} required></input>
          <textarea placeholder={texts.form.message} required></textarea>
          <button>{texts.form.button}</button>
        </form>
      </div>
    </div>
  );
};

export default BusinessPage;
