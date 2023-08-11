import { Interpolation, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';

function IconArrowLeft({
  iconCss,
  onClickBack,
}: {
  iconCss?: Interpolation<Theme>;
  onClickBack?: MouseEventHandler<SVGSVGElement>;
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
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 6l-6 6 6 6"
      ></path>
    </svg>
  );
}

export default IconArrowLeft;
