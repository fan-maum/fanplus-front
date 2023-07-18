function IconArrowDown({ stroke = '3' }: { stroke: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="12"
      fill="none"
      viewBox="-7 -3 37 21"
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
