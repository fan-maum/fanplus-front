import { publicEnv } from '@/utils/util';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleBusinessFormSubmit = async ({
  company,
  officer,
  email,
  message,
  setIsSuccess,
  resetBusinessState,
}: {
  company: string;
  officer: string;
  email: string;
  message: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  resetBusinessState: () => void;
}) => {
  const formdata: FormData = new FormData();

  formdata.append('company', company);
  formdata.append('officer', officer);
  formdata.append('email', email);
  formdata.append('message', message);

  const result = new Request(`${publicEnv.CLIENT_URL}/api/businessform`, {
    method: 'POST',
    body: formdata,
  });

  fetch(result).then((res) => {
    if (res.status === 200) {
      setIsSuccess(true);
      resetBusinessState();
      return;
    } else {
      // eslint-disable-next-line no-console
      console.log(res);
      return res.json();
    }
  });
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
