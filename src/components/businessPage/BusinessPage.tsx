import { BusinessPageTextType } from '@/types/textTypes';
import styles from './styles/BusinessPage.module.css';
import { ChangeEvent, useCallback, useState } from 'react';
import { handleBusinessFormSubmit, handleChangeState } from './FormHandle';
import { Center } from '../atoms/base/Center';
import { RequiredInput } from '../atoms/RequiredInput';
import { Button } from '../atoms/Button';
import { Typography, fontSettings } from '../atoms/base/Typography';

const BusinessPage = ({ texts }: { texts: BusinessPageTextType }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [company, setCompany] = useState<string>('');
  const [officer, setOfficer] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const resetBusinessState: () => void = useCallback(() => {
    setCompany('');
    setOfficer('');
    setEmail('');
    setMessage('');
  }, []);

  return (
    <Center
      css={{
        maxWidth: 1170,
        width: '100%',
        padding: 10,
        margin: '100px auto',
        wordBreak: 'keep-all',
      }}
    >
      <div css={{ width: '50%', padding: '0px 40px 0px 10px' }} className={` ${styles.box1}`}>
        <h1
          css={{
            ...fontSettings.headline[3],
            letterSpacing: 'normal',
            lineHeight: '50px',
            fontStretch: '100%',
            whiteSpace: 'pre-line',
            marginBottom: 40,
          }}
        >
          {texts.title}
        </h1>
        <p>{texts.content}</p>
        <div className={styles.info}>
          <h4 css={{ height: 28, lineHeight: '28px', color: 'rgb(153, 153, 153)' }}>Email</h4>
          <p className={styles.strong}>appfanplus@gmail.com</p>
        </div>
      </div>
      <div css={{ width: '50%' }}>
        <form
          css={{ width: '100%' }}
          onSubmit={(event) => {
            event.preventDefault();
            handleBusinessFormSubmit({
              company: company,
              officer: officer,
              email: email,
              message: message,
              setIsSuccess: setIsSuccess,
              resetBusinessState: resetBusinessState,
            });
          }}
        >
          <RequiredInput
            placeholder={texts.form.company}
            name="kkyqnibvdxfvfyiatukektnrqyuisxwadqxq"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeState({ event: event, setState: setCompany })
            }
            value={company}
          />
          <RequiredInput
            placeholder={texts.form.officer}
            name="upgzpglpaxnpamrpmdcpzkssehglkpauvpvo"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeState({ event: event, setState: setOfficer })
            }
            value={officer}
          />
          <RequiredInput
            type="email"
            placeholder={texts.form.email}
            name="kciseiitjtkzfsjccpnjvkgwdqeecdgdutay"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeState({ event: event, setState: setEmail })
            }
            value={email}
          />
          <RequiredInput
            textarea={true}
            placeholder={texts.form.message}
            name="ncnnxuhmcikxfpkkjcpdarleyfykweoqkeia"
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              handleChangeState({ event: event, setState: setMessage })
            }
            value={message}
          />
          <Button>
            {texts.form.button}
            <img css={{ marginLeft: 10, width: 16, height: 16 }} src="/icons/icon_send.svg" />
          </Button>
          {isSuccess && <div className={styles.greenBox}>YOUR EMAIL WAS SENT SUCCESSFULLY!</div>}
        </form>
      </div>
    </Center>
  );
};

export default BusinessPage;
