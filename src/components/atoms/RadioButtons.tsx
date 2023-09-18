import { TargetType } from '@/types/common';
import { Stack } from './Stack';
import styled from '@emotion/styled';

type RadioButtonsProps = {
  target_type: TargetType | null;
  selectedOption: string;
  handleChange: (event: any) => void;
};

export default function RadioButtons({
  target_type,
  selectedOption,
  handleChange,
}: RadioButtonsProps) {
  let selectArr;
  if (target_type === 'post') {
    selectArr = [
      {
        optionIndex: 1,
        content: '개인정보 노출',
      },
      {
        optionIndex: 2,
        content: '욕설 / 인신공격',
      },
      {
        optionIndex: 3,
        content: '음란 / 선정성',
      },
      {
        optionIndex: 4,
        content: '불법정보',
      },
      {
        optionIndex: 5,
        content: '권리침해',
      },
      {
        optionIndex: 6,
        content: '기타',
      },
    ];
  }
  if (target_type === 'comment') {
    selectArr = [
      {
        optionIndex: 'spam',
        content: '스팸',
      },
      {
        optionIndex: 'bad',
        content: '욕설 또는 악성 콘텐츠',
      },
    ];
  }

  return (
    <Stack spacing={20}>
      {selectArr?.map((option, index) => (
        <RadioOption key={index}>
          <input
            type="radio"
            value={option.optionIndex}
            checked={selectedOption === String(option.optionIndex)}
            onChange={handleChange}
          />
          {option.content}
        </RadioOption>
      ))}
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
