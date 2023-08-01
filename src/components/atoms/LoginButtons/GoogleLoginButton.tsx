import BaseLoginButton from "./BaseLoginButton";

const GoogleLoginButton = ({ texts }: { texts: string }) => {
  return <BaseLoginButton texts={texts} site="google" />;
};

export default GoogleLoginButton;
