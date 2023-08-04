import IconGoogle from '../IconGoogle';
import BaseLoginButton from './BaseLoginButton';

const GoogleLoginButton = ({ texts }: { texts: string }) => {
  return <BaseLoginButton texts={texts} site="google" icon={<IconGoogle />} />;
};

export default GoogleLoginButton;
