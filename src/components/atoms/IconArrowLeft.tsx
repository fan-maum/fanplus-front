import { Interpolation, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';

function IconArrowLeft({
  iconCss,
  onClickBack,
  stroke = '#000',
}: {
  iconCss?: Interpolation<Theme>;
  onClickBack?: MouseEventHandler<SVGSVGElement>;
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      css={iconCss}
      onClick={onClickBack}
    >
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 6l-6 6 6 6"
      ></path>
    </svg>
  );
}

export default IconArrowLeft;
