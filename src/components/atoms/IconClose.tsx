function IconClose({
  width = '26',
  height = '26',
  strokeColor = '#000',
  onClick,
}: {
  width?: string;
  height?: string;
  strokeColor?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 27 27"
      fill="none"
    >
      <path
        d="M6.4375 6.125L20.9375 20.625"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M6.4375 20.625L20.9375 6.125"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default IconClose;
