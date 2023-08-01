import BaseLoginButton from "./BaseLoginButton";

const AppleLoginButton = ({ texts }: { texts: string }) => {
  return <BaseLoginButton texts={texts} site="apple" />;
};

export default AppleLoginButton;
