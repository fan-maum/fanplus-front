export const isAndroid = (ua: string) => {
  return /Android/i.test(ua);
};

export const isIOSMobile = (ua: string) => {
  return /iPhone|iPad|iPod/i.test(ua);
};

export const isMobile = (ua: string) => {
  return isAndroid(ua) || isIOSMobile(ua);
};

export const isMac = (ua: string) => {
  return /Macintosh|MacIntel|MacPPC|Mac68K/i.test(ua);
};

export const isWindows = (ua: string) => {
  return /Windows|Win32|Win64|Windows NT/i.test(ua);
};

export const isDesktop = (ua: string) => {
  return isMac(ua) || isWindows(ua);
};

export const isIOS = (ua: string) => {
  return isIOSMobile(ua) || isMac(ua);
};
