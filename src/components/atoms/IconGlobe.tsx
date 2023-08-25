function IconGlobe() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      css={{
        margin: '0px 5px 2px 0px',
        width: '14px',
        height: '14px',
        '@media screen and (max-width:991px)': { margin: '0px 5px 0px 0px' },
      }}
    >
      <circle cx="12" cy="12" r="10.143" stroke="#666" strokeWidth="2.5"></circle>
      <path
        stroke="#666"
        strokeWidth="2.5"
        d="M16.143 12c0 2.966-.557 5.603-1.414 7.46-.897 1.943-1.934 2.683-2.729 2.683-.795 0-1.832-.74-2.729-2.683-.857-1.857-1.414-4.494-1.414-7.46s.557-5.602 1.414-7.46c.897-1.942 1.934-2.683 2.729-2.683.795 0 1.832.74 2.729 2.683.857 1.858 1.414 4.494 1.414 7.46z"
      ></path>
      <path fill="#666" d="M0.857 11.144H23.143V13.556000000000001H0.857z"></path>
    </svg>
  );
}

export default IconGlobe;
