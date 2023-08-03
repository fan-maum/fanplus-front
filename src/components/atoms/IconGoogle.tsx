function IconGoogle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      style={{ marginRight: '8px' }}
    >
      <path fill="url(#pattern0)" d="M0 0H18V18H0z"></path>
      <defs>
        <pattern id="pattern0" width="1" height="1" patternContentUnits="objectBoundingBox">
          <use transform="matrix(.0024 0 0 .0024 0 -.01)" xlinkHref="#image0_253_1978"></use>
        </pattern>
        <image
          id="image0_253_1978"
          width="417"
          height="426"
          xlinkHref="data:image/png;base64,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"
        ></image>
      </defs>
    </svg>
  );
}

export default IconGoogle;