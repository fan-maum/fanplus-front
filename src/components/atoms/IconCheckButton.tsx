import { Interpolation, Theme } from '@emotion/react';

function IconCheckButton({
  fill,
  stroke = '#abafb7',
  iconCss,
}: {
  fill?: string;
  stroke?: string;
  iconCss?: Interpolation<Theme>;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      css={iconCss}
    >
      <path
        fill={fill}
        d="M0 6a6 6 0 016-6h8a6 6 0 016 6v8a6 6 0 01-6 6H6a6 6 0 01-6-6V6z"
        stroke={stroke}
        strokeWidth="0.2"
      ></path>
      <path
        fill="#fff"
        stroke={stroke}
        strokeWidth="0.2"
        d="M8.092 15.2c-.381 0-.746-.164-1-.452L3.332 10.48a1.333 1.333 0 112.001-1.763l2.715 3.083 5.914-7.307a1.334 1.334 0 012.074 1.678l-6.908 8.533a1.337 1.337 0 01-1.01.495h-.027z"
      ></path>
    </svg>
  );
}

export default IconCheckButton;
