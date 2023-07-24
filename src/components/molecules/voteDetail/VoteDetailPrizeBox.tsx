import { useState } from 'react';
import { Center, Divider, Group, Stack } from '@/components/atoms';
import IconArrowDown from '@/components/atoms/IconArrowDown';
import { prizeTabContentsItemsProps } from '@/components/organisms/voteDetail/VoteDetailPrizeList';
import Image from 'next/image';

const VoteDetailPrizeBox = ({
  id,
  titleImage,
  question,
  answer,
}: {
  id: string;
  titleImage: string;
  question: string;
  answer: prizeTabContentsItemsProps;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
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
          <Center
            css={{
              gap: 10,
              fontSize: '18px',
              fontWeight: '500',
              marginRight: '5px',
            }}
          >
            <Image width={26} height={26} src={titleImage} alt="icon" />
            {question}
          </Center>
          <IconArrowDown width="16" isReverse={isOpen} />
        </Group>
        <div
          css={
            isOpen
              ? {
                  transitionDuration: '0.5s',
                  overflow: 'hidden',
                }
              : { maxHeight: 0, transitionDuration: '0.5s', overflow: 'hidden' }
          }
        >
          <div
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
            {answer.DESCRIPTION ? (
              <div dangerouslySetInnerHTML={{ __html: answer.DESCRIPTION }}></div>
            ) : (
              <Stack>
                <img src={answer.PRIZE_IMG} alt="prizeImage" />
                <div>{answer.PRIZE_TITLE}</div>
                <div>{answer.PRIZE_DESCRIPTION}</div>
              </Stack>
            )}
          </div>
        </div>
      </Stack>
      {id !== 'prizeTab_04' ? <Divider size={2} css={{ margin: '0 16px' }} /> : ''}
    </>
  );
};

export default VoteDetailPrizeBox;
