import type { UrlLangType } from '@/types/common';

const textName = {
  dotum: '돋움',
  malgunGothic: '맑은고딕',
  nanumGothic: '나눔고딕',
  nanumMyungjo: '나눔명조',
  basic: {
    ko: '기본서체',
    en: 'basic font',
    es: 'tipografía básica',
    in: 'jenis huruf dasar',
    ja: '基本書体',
    vi: 'kiểu chữ cơ bản',
    'zh-CN': '基本字体',
    'zh-TW': '基本字體',
  },
};

export const font_family_formats = (language: UrlLangType) => {
  const isKorean = language === 'ko';
  return (
    `${textName.basic[language]}="-apple-system,BlinkMacSystemFont,"Malgun Gothic","맑은 고딕",helvetica,"Apple SD Gothic Neo",sans-serif;` +
    `${isKorean ? textName.dotum : 'Dotum'}="돋움", dotum;` +
    `${isKorean ? textName.malgunGothic : 'Malgun Gothic'}="맑은 고딕", "Malgun Gothic";` +
    `${isKorean ? textName.nanumGothic : 'Nanum Gothic'}="나눔 고딕", "Nanum Gothic", serif;` +
    `${isKorean ? textName.nanumMyungjo : 'Nanum Ming-style'}="나눔명조", "Nanum Myeongjo", serif;`
  );
};

export const font_size_formats = '10px 11px 12px 14px 15px 18px 24px 30px 36px 48px 60px 72px 96px';
