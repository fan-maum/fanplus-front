import { TargetType } from '@/types/common';
import { Stack } from './Stack';
import styled from '@emotion/styled';
import { CommunityPostTextType } from '@/types/textTypes';

type RadioButtonsProps = {
  target_type: TargetType | null;
  selectedOption: string;
  texts: CommunityPostTextType;
  handleChange: (event: any) => void;
};

export default function RadioButtons({
  target_type,
  selectedOption,
  texts,
  handleChange,
}: RadioButtonsProps) {
  let selectArr;
  if (target_type === 'post') {
    selectArr = [
      {
        index: 1,
        optionIndex: 1,
        content: texts.reportPostOptions.option1,
      },
      {
        index: 2,
        optionIndex: 2,
        content: texts.reportPostOptions.option2,
      },
      {
        index: 3,
        optionIndex: 3,
        content: texts.reportPostOptions.option3,
      },
      {
        index: 4,
        optionIndex: 4,
        content: texts.reportPostOptions.option4,
      },
      {
        index: 5,
        optionIndex: 5,
        content: texts.reportPostOptions.option5,
      },
      {
        index: 6,
        optionIndex: 6,
        content: texts.reportPostOptions.option6,
      },
    ];
  }
  if (target_type === 'comment') {
    selectArr = [
      {
        index: 1,
        optionIndex: 'spam',
        content: texts.reportCommentOptions.option1,
      },
      {
        index: 2,
        optionIndex: 'bad',
        content: texts.reportCommentOptions.option2,
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
            checked={selectedOption === String(option.index)}
            onChange={() => handleChange(option)}
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
