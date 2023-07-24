import { useState } from 'react';
import { Group, Stack } from '@/components/atoms';
import IconArrowDown from '@/components/atoms/IconArrowDown';

const VoteDetailPrizeBox = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Stack w={'100%'} px={'20px'}>
      <Group
        h={'100%'}
        align="center"
        position="apart"
        onClick={handleClick}
        css={{
          cursor: 'pointer',
          padding: '21px 0',
          color: '#101010',
        }}
      >
        <h3
          css={{
            fontSize: '18px',
            fontWeight: '500',
            marginRight: '5px',
          }}
        >
          {question}
        </h3>
        <IconArrowDown width="16" isReverse={isOpen} />
      </Group>
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
    </Stack>
  );
};

export default VoteDetailPrizeBox;
