function PlayStoreIcon({ fill = '#ffffff' }: { fill: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      style={{ marginRight: '7px' }}
    >
      <path fill="none" fillOpacity="0.2" d="M0 24H24V48H0z" transform="rotate(-90 0 24)"></path>
      <path fill="none" fillOpacity="0.2" d="M1 23H23V45H1z" transform="rotate(-90 1 23)"></path>
      <path
        fill={fill}
        fillRule="evenodd"
        d="M18.5 12.796a1 1 0 000-1.732L14.426 8.71l-3.719 3.719 3.084 3.084 4.709-2.718zm-5.605 3.236L10 13.137l-5 5v.72a1 1 0 001.5.867l6.395-3.692zM5 16.722l4.293-4.292L5 8.137v8.586zm0-10l5 5 3.529-3.528L6.5 4.135a1 1 0 00-1.5.866v1.722z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default PlayStoreIcon;
