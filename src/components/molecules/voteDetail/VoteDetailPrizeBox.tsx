import { useState } from 'react';
import { Stack } from '@/components/atoms';
import IconArrowDown from '@/components/atoms/IconArrowDown';

const VoteDetailPrizeBox = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      css={{
        width: '100%',
        padding: '10px 15px',
        color: 'rgb(51,51,51)',
        '@media screen and (max-width: 768px)': {
          padding: 5,
        },
      }}
    >
      <Stack
        align="center"
        justify="space-between"
        direct="row"
        onClick={handleClick}
        css={{ cursor: 'pointer', padding: '10px 15px', marginBottom: 10 }}
      >
        <h3
          css={{
            fontSize: '18px',
            lineHeight: '36px',
            fontWeight: '500',
            marginRight: '5px',
            ':hover': { color: 'rgb(102,102,102)' },
            '@media screen and (max-width: 768px)': {
              lineHeight: '24px',
            },
          }}
        >
          {question}
        </h3>
        <IconArrowDown width="16" isReverse={isOpen} />
      </Stack>
      <div
        css={
          isOpen
            ? {
                maxHeight: 200,
                transitionDuration: '1s',
                overflow: 'hidden',
                '@media screen and (max-width: 768px)': {
                  maxHeight: 320,
                },
              }
            : { maxHeight: 0, transitionDuration: '0.8s', overflow: 'hidden' }
        }
      >
        <p
          css={{
            padding: '0px 40px',
            fontSize: '16px',
            color: 'rgb(102,102,102)',
            margin: '10px 0px 20px',
            lineHeight: '30px',
            '@media screen and (max-width: 768px)': {
              margin: '10px 0px',
              padding: '0px 25px',
            },
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
};

export default VoteDetailPrizeBox;
