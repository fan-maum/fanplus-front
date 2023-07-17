import { BusinessPageTextType } from '@/types/textTypes';
import { Center } from '../atoms/Center';
import BusinessInfo from '../organisms/BusinessInfo';
import BusinessForm from '../organisms/BusinessForm';

const BusinessTemplate = ({ texts }: { texts: BusinessPageTextType }) => {
  return (
    <Center
      css={{
        maxWidth: 1170,
        width: '100%',
        padding: 10,
        margin: '100px auto',
        wordBreak: 'keep-all',
        '@media screen and (max-width: 768px)': {
          flexDirection: 'column',
          margin: '0px',
          padding: '80px 15px 100px 15px',
        },
      }}
    >
      <BusinessInfo texts={texts} />
      <BusinessForm texts={texts} />
    </Center>
  );
};

export default BusinessTemplate;
