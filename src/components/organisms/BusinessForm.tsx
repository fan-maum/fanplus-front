import { BusinessPageTextType } from '@/types/textTypes';
import { ChangeEvent, useCallback, useState } from 'react';
import { handleBusinessFormSubmit, handleChangeState } from './BusinessFormHandle';
import { RequiredInput } from '../atoms/RequiredInput';
import { Button } from '../atoms/Button';

const BusinessForm = ({ texts }: { texts: BusinessPageTextType }) => {
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
    <div
      css={{
        width: '50%',
        '@media screen and (max-width: 768px)': {
          width: '100%',
          padding: '0px',
        },
      }}
    >
      <form
        css={{
          width: '100%',
          '@media screen and (max-width: 768px)': {
            marginTop: 40,
          },
        }}
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
        {isSuccess && (
          <div
            css={{
              width: '100%',
              marginTop: 15,
              padding: '17px 30px',
              backgroundColor: 'rgb(21,208,83)',
              color: 'white',
              fontSize: 12,
              lineHeight: '24px',
              letterSpacing: '2.5px',
              fontWeight: '600',
            }}
          >
            YOUR EMAIL WAS SENT SUCCESSFULLY!
          </div>
        )}
      </form>
    </div>
  );
};
export default BusinessForm;
