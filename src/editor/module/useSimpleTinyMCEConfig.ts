import { tinyMCEResetCSS } from "../constant/tinyMCEResetCSS";

export const useSimpleTinyMCEConfig = () => {
  const min_height = 90;

  return {
    toolbar: false,
    inline: true,
    min_height,
    skin: "oxide",
    language: "ko_KR",
    menubar: false,
    branding: false,
    promotion: false,
    statusbar: false,
    content_style: tinyMCEResetCSS,
  };
};
