import { BusinessPageTextType } from '@/types/textTypes';
import { fontSettings } from '../atoms/base/Typography';

const BusinessInfo = ({ texts }: { texts: BusinessPageTextType }) => {
  return (
    <div
      css={{
        width: '50%',
        padding: '0px 40px 0px 10px',
        '@media screen and (max-width: 768px)': {
          width: '100%',
          padding: '0px',
        },
      }}
    >
      <h1
        css={{
          ...fontSettings.headline[3],
          letterSpacing: 'normal',
          lineHeight: '50px',
          fontStretch: '100%',
          whiteSpace: 'pre-line',
          marginBottom: 40,
        }}
      >
        {texts.title}
      </h1>
      <p
        css={{
          marginBottom: 40,
          lineHeight: '30px',
          color: 'rgb(102, 102, 102)',
        }}
      >
        {texts.content}
      </p>
      <div>
        <h4 css={{ height: 28, lineHeight: '28px', color: 'rgb(153, 153, 153)' }}>Email</h4>
        <p css={{ marginBottom: 10, color: '#ff5656' }}>appfanplus@gmail.com</p>
      </div>
    </div>
  );
};

export default BusinessInfo;
