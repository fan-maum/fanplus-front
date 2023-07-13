export type AppLinkType = {
  storeIcon: string;
  storeName: string;
  storeLink: string;
  bgColor: string;
  fontColor: string;
};

const AppLink = ({ storeIcon, storeName, storeLink, bgColor, fontColor }: AppLinkType) => {
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
            backgroundColor: fontColor,
            color: bgColor,
          },
          '@media(max-width:768px)': {
            width: '155px',
          },
        }}
      >
        <img src={storeIcon} alt="" css={{ width: '22px', height: '22px', marginRight: '10px' }} />
        <p css={{ marginTop: '4px', fontWeight: '500' }}>{storeName}</p>
      </div>
    </a>
  );
};

export default AppLink;
