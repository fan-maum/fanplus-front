function IconReply(props: any) {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{ marginLeft: 4, transform: props.closeReply ? 'none' : 'rotate(180deg)' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.19428 5.78033C1.48717 6.07322 1.96205 6.07322 2.25494 5.78033L6.22461 1.81066L10.1943 5.78033C10.4872 6.07322 10.962 6.07322 11.2549 5.78033C11.5478 5.48744 11.5478 5.01256 11.2549 4.71967L6.75494 0.21967C6.46205 -0.0732231 5.98717 -0.0732231 5.69428 0.21967L1.19428 4.71967C0.901386 5.01256 0.901386 5.48744 1.19428 5.78033Z"
        fill="#999999"
      />
    </svg>
  );
}

export default IconReply;
