import { Stack } from './Stack';
import styled from '@emotion/styled';

export default function RadioButtons(props) {
  return (
    <Stack spacing={20}>
      <RadioOption>
        <input
          type="radio"
          value="option1"
          checked={props.selectedOption === 'option1'}
          onChange={props.handleChange}
        />
        개인정보 노출
      </RadioOption>
      <RadioOption>
        <input
          type="radio"
          value="option2"
          checked={props.selectedOption === 'option2'}
          onChange={props.handleChange}
        />
        욕설 / 인신공격
      </RadioOption>
      <RadioOption>
        <input
          type="radio"
          value="option3"
          checked={props.selectedOption === 'option3'}
          onChange={props.handleChange}
        />
        음란 / 선정성
      </RadioOption>
      <RadioOption>
        <input
          type="radio"
          value="option4"
          checked={props.selectedOption === 'option4'}
          onChange={props.handleChange}
        />
        불법정보
      </RadioOption>
      <RadioOption>
        <input
          type="radio"
          value="option5"
          checked={props.selectedOption === 'option5'}
          onChange={props.handleChange}
        />
        권리침해
      </RadioOption>
      <RadioOption>
        <input
          type="radio"
          value="option6"
          checked={props.selectedOption === 'option6'}
          onChange={props.handleChange}
        />
        기타
      </RadioOption>
    </Stack>
  );
}

const RadioOption = styled.label`
  color: #000;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  & > input {
    margin-right: 10px;
  }
`;
