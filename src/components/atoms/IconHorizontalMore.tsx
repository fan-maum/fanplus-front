import { Interpolation, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';

export default function IconHorizontalMore({
  iconCss,
  handleClickMore,
}: {
  iconCss?: Interpolation<Theme>;
  handleClickMore?: MouseEventHandler<SVGSVGElement>;
}) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
      css={iconCss}
      onClick={handleClickMore}
    >
      <path
        d="M7.95314 12.5C7.95314 13.3284 7.28069 14 6.45118 14C5.62167 14 4.94922 13.3284 4.94922 12.5C4.94922 11.6716 5.62167 11 6.45118 11C7.28069 11 7.95314 11.6716 7.95314 12.5Z"
        fill="black"
      />
      <path
        d="M13.961 12.5C13.961 13.3284 13.2885 14 12.459 14C11.6295 14 10.957 13.3284 10.957 12.5C10.957 11.6716 11.6295 11 12.459 11C13.2885 11 13.961 11.6716 13.961 12.5Z"
        fill="black"
      />
      <path
        d="M19.9688 12.5C19.9688 13.3284 19.2963 14 18.4668 14C17.6373 14 16.9648 13.3284 16.9648 12.5C16.9648 11.6716 17.6373 11 18.4668 11C19.2963 11 19.9688 11.6716 19.9688 12.5Z"
        fill="black"
      />
    </svg>
  );
}
