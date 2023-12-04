const MainLogo = () => {
  return (
    <>
      <img
        src="/images/fanplus_logo_hor.png"
        alt="Fanplus 로고"
        css={{
          margin: '0px 15px',
          '@media(max-width:768px)': {
            display: 'none',
          },
        }}
      />
      <img
        src="/images/fanplus_logo_small.png"
        alt="Fanplus 로고"
        css={{
          display: 'none',
          width: '26px',
          margin: '0px 15px',
          '@media(max-width: 768px)': {
            display: 'block',
          },
        }}
      />
    </>
  );
};

export default MainLogo;
