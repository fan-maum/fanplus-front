import type { LangStringType } from '@/types/common';
import type { CommunityLayoutTextType } from '@/types/textTypes';

export const communityLayoutTexts: LangStringType<CommunityLayoutTextType> = {
  ko: {
    userCard: ['로그인을 해주세요', '내가 쓴 글', '로그아웃'],
    popularBoards: '인기 게시판',
    searchPlaceholder: '원하는 게시판을 찾아보세요.',
    close: '닫기',
  },
  en: {
    popularBoards: 'Popular board',
    userCard: ['Sign In', 'My posts', 'Sign Out'],
    searchPlaceholder: 'Search for a board you may like.',
    close: 'Close',
  },
  es: {
    popularBoards: 'Popular tablero',
    userCard: ['Inicio de sesión', 'El texto que escribí', 'Cierre de sesión'],
    searchPlaceholder: 'Encuentra el tablón de anuncios que deseas.',
    close: 'Cerrar',
  },
  in: {
    popularBoards: 'Populer papan',
    userCard: ['Log Masuk', 'Cerita Saya', 'Log keluar'],
    searchPlaceholder: 'Cari papan yang mungkin Anda sukai.',
    close: 'Tutup',
  },
  ja: {
    popularBoards: '人気掲示板',
    userCard: ['ログオン', '私が書いた記事', 'ログアウト'],
    searchPlaceholder: '希望の掲示板を見つけてください。',
    close: '閉じる',
  },
  vi: {
    popularBoards: 'Nổi tiếng board',
    userCard: ['Việc đăng nhập', 'Câu chuyện của tôi', 'Đăng xuất'],
    searchPlaceholder: 'Tìm kiếm một bảng bạn có thể thích.',
    close: 'Đóng',
  },
  'zh-CN': {
    popularBoards: '人气消息面板',
    userCard: ['登入', '我发的贴子', '退出登录'],
    searchPlaceholder: '找到您想要的消息面板',
    close: '关闭',
  },
  'zh-TW': {
    popularBoards: '人氣訊息面板',
    userCard: ['登入', '我發的貼子', '登出登入'],
    searchPlaceholder: '找到您想要的消息面板',
    close: '關閉',
  },
};
