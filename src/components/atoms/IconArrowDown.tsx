function IconArrowDown({
  width = '22',
  height = '100%',
  strokeWidth = '2',
  isReverse = false,
}: {
  width?: string;
  height?: string;
  strokeWidth?: string;
  isReverse?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 22 12"
      css={{
        flexShrink: '0',
        transition: '0.4s ease-in-out',
        transform: isReverse ? 'scaleY(-1)' : '',
      }}
    >
      <path
        stroke="#666"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M1 1l10 10L21 1"
      ></path>
    </svg>
  );
}

export default IconArrowDown;
