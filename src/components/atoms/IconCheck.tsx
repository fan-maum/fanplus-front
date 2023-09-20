function IconCheck({ width, height }: { width?: string; height?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '14'}
      height={height || '12'}
      fill="none"
      viewBox="0 0 14 12"
    >
      <path
        fill="#fff"
        d="M5.092 11.2c-.381 0-.746-.164-1-.452L.332 6.48a1.333 1.333 0 112.001-1.763l2.715 3.083L10.963.494a1.334 1.334 0 012.074 1.678l-6.908 8.533a1.337 1.337 0 01-1.01.495h-.027z"
      ></path>
    </svg>
  );
}

export default IconCheck;
