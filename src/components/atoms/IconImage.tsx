function IconImage() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="none"
      viewBox="0 0 10 10"
      css={{ margin: '0 0 2px 2px', flexShrink: 0, width: 16, height: 16 }}
    >
      <path
        fill="#666"
        d="M.333 1.5C.333.856.856.333 1.5.333h7.292c.644 0 1.166.523 1.166 1.167v7.292c0 .644-.522 1.166-1.166 1.166H1.5A1.167 1.167 0 01.333 8.792V1.5z"
      ></path>
      <path fill="#fff" d="M3.25 2.958a.875.875 0 11-1.75 0 .875.875 0 011.75 0z"></path>
      <mask
        id="mask0_5195_5785"
        style={{ maskType: 'alpha' }}
        width="10"
        height="7"
        x="0"
        y="3"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          d="M9.424 4.125a.583.583 0 00-.584-.583H.917a.583.583 0 00-.584.583V8.84c0 .322.261.583.584.583H8.84a.583.583 0 00.584-.583V4.125z"
        ></path>
      </mask>
      <g mask="url(#mask0_5195_5785)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M6.555 5.291a.583.583 0 01.955 0L9.847 8.62a.583.583 0 01-.477.918H6.132c-.183 0-.318.177-.393.343a.578.578 0 01-.533.346h-3.33a.583.583 0 01-.479-.916l1.665-2.402a.583.583 0 01.959 0l.457.659a.292.292 0 00.478.001l1.6-2.277z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}

export default IconImage;
