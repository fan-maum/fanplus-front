function CircleIcon({ fill = 'none' }: { fill: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
      <circle cx="6" cy="6" r="5" fill={fill} stroke="#000" strokeWidth="1.5"></circle>
    </svg>
  );
}

export default CircleIcon;
