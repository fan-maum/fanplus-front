import IconAppStore from '../IconAppStore';
import BaseLoginButton from './BaseLoginButton';

const AppleLoginButton = ({ texts, nextUrl }: { texts: string; nextUrl: string }) => {
  return (
    <BaseLoginButton
      texts={texts}
      site="apple"
      icon={<IconAppStore fill="#000" mB="5px" />}
      nextUrl={nextUrl}
    />
  );
};

export default AppleLoginButton;
