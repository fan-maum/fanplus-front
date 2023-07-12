import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleBusinessFormSubmit = async ({
  company,
  officer,
  email,
  message,
  setIsSuccess,
  ResetState,
}: {
  company: string;
  officer: string;
  email: string;
  message: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  ResetState: () => void;
}) => {
  const formdata: FormData = new FormData();

  formdata.append('company', company);
  formdata.append('officer', officer);
  formdata.append('email', email);
  formdata.append('message', message);

  const result = new Request('http://localhost:3000/api/Businessform', {
    method: 'POST',
    body: formdata,
  });

  fetch(result).then((res) => {
    if (res.status === 200) {
      setIsSuccess(true);
      ResetState();
      return;
    } else {
      console.log(res);
      return res.json();
    }
  });
};

export const resetBusinessState = ({
  setCompany,
  setOfficer,
  setEmail,
  setMessage,
}: {
  setCompany: Dispatch<SetStateAction<string>>;
  setOfficer: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
}) => {
  setCompany('');
  setOfficer('');
  setEmail('');
  setMessage('');
};

export const handleChangeState = ({
  event,
  setState,
}: {
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;
  setState: Dispatch<SetStateAction<string>>;
}) => {
  setState(event?.target.value);
};
