import React from 'react';

type OwnPropType = {
  text: string;
  onClick?: () => void;
  minWidth?: React.CSSProperties['minWidth'];
  minHeight?: React.CSSProperties['height'];
  margin?: React.CSSProperties['margin'];
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
};

const GradientButton = ({
  text,
  onClick,
  minWidth,
  minHeight,
  margin,
  fontSize,
  fontWeight,
}: OwnPropType) => {
  return (
    <div
      css={{
        minWidth: minWidth || '132px',
        minHeight: minHeight || '48px',
        margin: margin || '30px 0px 0px',
        padding: '5px 20px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: fontSize || '20px',
        fontWeight: fontWeight,
        color: '#fff',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(104deg, #ff5656 7.74%, #ef30ba 96.35%)',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default GradientButton;
