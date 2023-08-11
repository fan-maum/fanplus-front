import IconGoogle from '../IconGoogle';
import BaseLoginButton from './BaseLoginButton';

const GoogleLoginButton = ({ texts, onClick }: { texts: string; onClick: () => void }) => {
  const handleClick = () => {
    onClick();
  };

  return <BaseLoginButton texts={texts} icon={<IconGoogle />} onClick={handleClick} />;
};

export default GoogleLoginButton;
