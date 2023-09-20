export const userAgentOS = () => {
  const userAgent = navigator?.userAgent?.toLowerCase();

  if (userAgent.includes("android")) return "android";
  if (
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod")
  ) {
    return "ios";
  }
  return "otherDevice";
};
