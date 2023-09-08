import { Interpolation, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';

export default function IconVerticalMore({
  iconCss,
  handleClickMore,
}: {
  iconCss?: Interpolation<Theme>;
  handleClickMore?: MouseEventHandler<SVGSVGElement>;
}) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={iconCss}
      onClick={handleClickMore}
    >
      <path
        d="M19.1665 11.6667C17.7858 11.6667 16.6665 10.5475 16.6665 9.16675C16.6665 7.78604 17.7858 6.66675 19.1665 6.66675C20.5472 6.66675 21.6665 7.78604 21.6665 9.16675C21.6665 10.5475 20.5472 11.6667 19.1665 11.6667Z"
        fill="black"
      />
      <path
        d="M19.1665 21.6667C17.7858 21.6667 16.6665 20.5475 16.6665 19.1667C16.6665 17.786 17.7858 16.6667 19.1665 16.6667C20.5472 16.6667 21.6665 17.786 21.6665 19.1667C21.6665 20.5475 20.5472 21.6667 19.1665 21.6667Z"
        fill="black"
      />
      <path
        d="M19.1665 31.6667C17.7858 31.6667 16.6665 30.5475 16.6665 29.1667C16.6665 27.786 17.7858 26.6667 19.1665 26.6667C20.5472 26.6667 21.6665 27.786 21.6665 29.1667C21.6665 30.5475 20.5472 31.6667 19.1665 31.6667Z"
        fill="black"
      />
    </svg>
  );
}