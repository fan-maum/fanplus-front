import { mobileToolbar, pcToolbar } from '../constant/toolbarOption';
import { userAgentOS } from '../util/userAgentOS';

import { font_family_formats, font_size_formats } from '../constant/tinyMCEFont';
import { tinyMCEResetCSS } from '../constant/tinyMCEResetCSS';
import { LangCookie } from '@/utils/setLangCookie';

export const useTinyMCEConfig = (language: LangCookie) => {
  const device = userAgentOS();
  const isMobile = ['android', 'ios'].includes(device);
  const min_height = isMobile ? 450 : 600;
  const plugins = 'link image code table lists media autoresize';

  return {
    toolbar: pcToolbar,
    toolbar_mode: 'wrap',
    plugins,
    min_height,
    skin: 'oxide',
    language: language,
    menubar: false,
    branding: false,
    promotion: false,
    statusbar: false,
    font_size_formats,
    font_family_formats: font_family_formats(language),
    toolbar_sticky: true,
    toolbar_sticky_offset: 85, // * 툴바 고정 위치 조정
    content_style: tinyMCEResetCSS,
    mobile: {
      toolbar: mobileToolbar,
      toolbar_sticky: false,
      toolbar_location: 'top',
      content_style: `
        html {
          max-height: 67vh;
          overflow: scroll;
        }
        ${tinyMCEResetCSS}
      `,
    },
  };
};
