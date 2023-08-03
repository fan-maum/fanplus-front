import { Interpolation, Theme } from '@emotion/react';

function IconBack({ iconCss }: { iconCss?: Interpolation<Theme> }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      fill="none"
      viewBox="0 0 16 14"
      css={iconCss}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 1L1 7l6 6"
      ></path>
      <rect width="14" height="2" x="2" y="6" fill="#000" rx="1"></rect>
    </svg>
  );
}

export default IconBack;
