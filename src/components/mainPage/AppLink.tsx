import { ReactNode } from 'react';

export type AppLinkType = {
  storeName: string;
  storeLink: string;
  storeIcon: ReactNode;
  bgColor: string;
  bgAfterColor: string;
  fontColor: string;
};

const AppLink = ({
  storeName,
  storeLink,
  storeIcon,
  bgColor,
  bgAfterColor,
  fontColor,
}: AppLinkType) => {
  return (
    <a
      href={storeLink}
      target="_blank"
      css={{
        margin: '10px 20px',
        '@media(max-width:768px)': {
          margin: '10px 7px',
        },
      }}
      id={storeName}
    >
      <div
        css={{
          width: '180px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #ff5656',
          borderRadius: '4px',
          fontSize: '16px',
          lineHeight: '16px',
          transition: '0.3s ease-in-out',
          backgroundColor: bgColor,
          color: fontColor,
          ':hover': {
            backgroundColor: bgAfterColor,
            borderColor: bgAfterColor,
            color: '#ffffff',
            'svg path:last-child': { fill: '#ffffff' },
          },
          '@media(max-width:768px)': {
            width: '155px',
          },
        }}
      >
        {storeIcon}
        <p css={{ marginTop: '4px', fontWeight: '600' }}>{storeName}</p>
      </div>
    </a>
  );
};

export default AppLink;
