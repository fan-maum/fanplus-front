import type { LangStringType } from '@/types/common';
import type { CommunityPageTextType } from '@/types/textTypes';

export const communityMainPageTexts: LangStringType<CommunityPageTextType> = {
  ko: {
    community: '커뮤니티',
    home: '게시판 홈',
    search: '게시판 검색',
    recentlyBoards: '최근 방문한 게시판',
    recommendedBoards: '추천 게시판',
    noRecentBoardTexts: ['팬플러스는 처음 사용하시나요?', '좋아하는 스타를 검색해 보세요!'],
    buttonSearch: '검색',
    allCategory: '전체',
    searchPlaceholder: '원하는 게시판을 찾아보세요.',
    link: { board: '/ko/community/board' },
  },
  en: {
    community: 'Community',
    home: 'Home',
    search: 'Search',
    recentlyBoards: 'Recently Visited Board',
    recommendedBoards: 'Recommended for you',
    noRecentBoardTexts: ['Are you new to FanPlus?', 'Search for your favorite star!'],
    buttonSearch: 'Search',
    allCategory: 'All',
    searchPlaceholder: 'Search for a board you may like.',
    link: { board: '/en/community/board' },
  },
  es: {
    community: 'Comunidad',
    home: 'Home',
    search: 'Search',
    recentlyBoards: 'Visita reciente',
    recommendedBoards: 'Recomendación',
    noRecentBoardTexts: ['¿Eres nuevo en FanPlus?', '¡Busca tu estrella favorita!'],
    buttonSearch: 'Buscar',
    allCategory: 'Total',
    searchPlaceholder: 'Encuentra el tablón de anuncios que deseas.',
    link: { board: '/es/community/board' },
  },
  in: {
    community: 'Komunitas',
    home: 'Beranda',
    search: 'Cari',
    recentlyBoards: 'Papan Baru-Baru Ini Dikunjungi',
    recommendedBoards: 'Disarankan untuk Anda',
    noRecentBoardTexts: [
      'Apakah ini pertama kalinya',
      'Anda menggunakan Fan Plus?',
      'Cari bintang favoritmu!',
    ],
    buttonSearch: 'Cari',
    allCategory: 'Semua',
    searchPlaceholder: 'Cari papan yang mungkin Anda sukai.',
    link: { board: '/in/community/board' },
  },
  ja: {
    community: 'コミュニティ',
    home: '掲示板ホーム',
    search: '掲示板検索',
    recentlyBoards: '最近訪れた掲示板',
    recommendedBoards: 'おすすめ掲示板',
    noRecentBoardTexts: ['ファンプラスを利用するのは初めてですか?', 'お気に入りのスターを探せ！'],
    buttonSearch: '検索',
    allCategory: '全',
    searchPlaceholder: '希望の掲示板を見つけてください。',
    link: { board: '/ja/community/board' },
  },
  vi: {
    community: 'Cộng đồng',
    home: 'Trang chủ',
    search: 'Tìm kiếm',
    recentlyBoards: 'Ban đã ghé thăm gần đây',
    recommendedBoards: 'Được đề xuất cho của bạn',
    noRecentBoardTexts: [
      'Đây có phải là lần đầu tiên',
      'bạn sử dụng Fan Plus?',
      'Hãy tìm kiếm ngôi sao yêu thích của bạn!',
    ],
    buttonSearch: 'Tìm kiếm',
    allCategory: 'Tất cả',
    searchPlaceholder: 'Tìm kiếm một bảng bạn có thể thích.',
    link: { board: '/vi/community/board' },
  },
  'zh-CN': {
    community: '社区',
    home: '消息面板主页',
    search: '搜索消息面板',
    recentlyBoards: '最近浏览的消息面板',
    recommendedBoards: '推荐的消息面板',
    noRecentBoardTexts: ['您是FanPlus新手吗？', '搜索你最喜欢的明星！'],
    buttonSearch: '搜索',
    allCategory: '全部',
    searchPlaceholder: '找到您想要的消息面板',
    link: { board: '/zh-CN/community/board' },
  },
  'zh-TW': {
    community: '社區',
    home: '消息面板主頁',
    search: '搜索消息面板',
    recentlyBoards: '最近瀏覽的消息面板',
    recommendedBoards: '推薦的消息面板',
    noRecentBoardTexts: ['您是FanPlus新手嗎？', '搜索你最喜歡的明星！'],
    buttonSearch: '搜索',
    allCategory: '全部',
    searchPlaceholder: '找到您想要的消息面板',
    link: { board: '/zh-TW/community/board' },
  },
};