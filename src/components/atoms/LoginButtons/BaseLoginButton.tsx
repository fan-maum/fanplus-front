import { FC, ReactNode, useContext } from 'react';

type LoginButtonProps = {
  texts: string;
  icon?: ReactNode;
  onClick: () => void;
};

const BaseLoginButton: FC<LoginButtonProps> = ({ texts, icon, onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button
      css={{
        maxWidth: '340px',
        maxHeight: '56px',
        width: '90%',
        minHeight: '45px',
        border: '1px solid #d9d9d9',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: '5px 0px',
        fontSize: '18px',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#d9d9d9',
          transition: '0.4s ease-out',
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {texts}
    </button>
  );
};

export default BaseLoginButton;
