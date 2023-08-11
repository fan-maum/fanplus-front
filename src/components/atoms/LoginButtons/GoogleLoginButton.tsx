import IconGoogle from '../IconGoogle';
import BaseLoginButton from './BaseLoginButton';

const GoogleLoginButton = ({ texts, nextUrl }: { texts: string; nextUrl: string }) => {
  return <BaseLoginButton texts={texts} site="google" icon={<IconGoogle />} nextUrl={nextUrl} />;
};

export default GoogleLoginButton;
