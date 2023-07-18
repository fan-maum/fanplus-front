function IconArrowDown({
  width = '22',
  height = '12',
  stroke = '3',
}: {
  width: string;
  height: string;
  stroke: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 22 12"
    >
      <path
        stroke="#666"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M1 1l10 10L21 1"
      ></path>
    </svg>
  );
}

export default IconArrowDown;
