import IconAppStore from '../IconAppStore';
import BaseLoginButton from './BaseLoginButton';

const AppleLoginButton = ({ texts, onClick }: { texts: string; onClick: () => void }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <BaseLoginButton
      texts={texts}
      icon={<IconAppStore fill="#000" mB="5px" />}
      onClick={handleClick}
    />
  );
};

export default AppleLoginButton;
