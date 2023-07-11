import { BusinessPageTextType } from '@/types/textTypes';
import styles from './styles/BusinessPage.module.css';
import { useCallback, useState } from 'react';
import { ChangeHandle, ResetState, SubmitHandle } from './FormHandle';

const BusinessPage = ({ texts }: { texts: BusinessPageTextType }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [company, setCompany] = useState<string>('');
  const [officer, setOfficer] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const ResetStateMemo: () => void = useCallback(
    () =>
      ResetState({
        setCompany: setCompany,
        setOfficer: setOfficer,
        setEmail: setEmail,
        setMessage: setMessage,
      }),
    []
  );

  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${styles.box1}`}>
        <h1>{texts.title}</h1>
        <p>{texts.content}</p>
        <div className={styles.info}>
          <h4>Email</h4>
          <p className={styles.strong}>appfanplus@gmail.com</p>
        </div>
      </div>
      <div className={styles.box}>
        <input
          placeholder={texts.form.company}
          required
          name="kkyqnibvdxfvfyiatukektnrqyuisxwadqxq"
          onChange={(event) => ChangeHandle({ event: event, setState: setCompany })}
          value={company}
        ></input>
        <input
          placeholder={texts.form.officer}
          required
          name="upgzpglpaxnpamrpmdcpzkssehglkpauvpvo"
          onChange={(event) => ChangeHandle({ event: event, setState: setOfficer })}
          value={officer}
        ></input>
        <input
          type="email"
          placeholder={texts.form.email}
          required
          name="kciseiitjtkzfsjccpnjvkgwdqeecdgdutay"
          onChange={(event) => ChangeHandle({ event: event, setState: setEmail })}
          value={email}
        ></input>
        <textarea
          placeholder={texts.form.message}
          required
          name="ncnnxuhmcikxfpkkjcpdarleyfykweoqkeia"
          onChange={(event) => ChangeHandle({ event: event, setState: setMessage })}
          value={message}
        ></textarea>
        <button
          onClick={() => {
            SubmitHandle({
              company: company,
              officer: officer,
              email: email,
              message: message,
              setIsSuccess: setIsSuccess,
              ResetState: ResetStateMemo,
            });
          }}
        >
          {texts.form.button}
          <img src="/icons/icon_send.svg" />
        </button>
        {isSuccess && <div className={styles.greenBox}>YOUR EMAIL WAS SENT SUCCESSFULLY!</div>}
      </div>
    </div>
  );
};

export default BusinessPage;
