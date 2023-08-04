import IconAppStore from '../IconAppStore';
import BaseLoginButton from './BaseLoginButton';

const AppleLoginButton = ({ texts }: { texts: string }) => {
  return (
    <BaseLoginButton texts={texts} site="apple" icon={<IconAppStore fill="#000" mB="5px" />} />
  );
};

export default AppleLoginButton;
