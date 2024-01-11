import type { LangStringType } from '@/types/common';
import type { CommunityPageTextType } from '@/types/textTypes';

export const communityMainPageTexts: LangStringType<CommunityPageTextType> = {
  ko: {
    community: '커뮤니티',
    boards: '전체 게시판',
    boardMain: '전체글',
    bestPopular: 'BEST 인기글',
    recentlyBoards: '최근 방문한 게시판',
    recommendedBoards: '추천 게시판',
    noRecentBoardTexts: ['팬플러스는 처음 사용하시나요?', '좋아하는 스타를 검색해 보세요!'],
    buttonSearch: '검색',
    allCategory: '전체',
    postCount: '게시글 수',
    link: { board: '/ko/community/board' },
    noResult: ['검색 결과가 없습니다.', '연예인 명을 다시 한 번 확인해주세요.'],
  },
  en: {
    community: 'Community',
    boards: 'All',
    boardMain: 'All',
    bestPopular: 'Most popular(live)',
    recentlyBoards: 'Recently Visited Board',
    recommendedBoards: 'Recommended for you',
    noRecentBoardTexts: ['Are you new to FanPlus?', 'Search for your favorite star!'],
    buttonSearch: 'Search',
    allCategory: 'All',
    postCount: 'Posts',
    link: { board: '/en/community/board' },
    noResult: ['No results', "Please check the star's name again."],
  },
  es: {
    community: 'Comunidad',
    boards: 'Todos',
    boardMain: 'Todos',
    bestPopular: 'Más popular (actual)',
    recentlyBoards: 'Visita reciente',
    recommendedBoards: 'Recomendación',
    noRecentBoardTexts: ['¿Eres nuevo en FanPlus?', '¡Busca tu estrella favorita!'],
    buttonSearch: 'Buscar',
    allCategory: 'Total',
    postCount: 'Publicación',
    link: { board: '/es/community/board' },
    noResult: [
      'No se encontraron resultados para tu búsqueda.',
      'Por favor verifique el nombre de la celebridad nuevamente.',
    ],
  },
  in: {
    community: 'Komunitas',
    boards: 'Semua',
    boardMain: 'Semua',
    bestPopular: 'Paling populer (saat ini)',
    recentlyBoards: 'Papan Baru-Baru Ini Dikunjungi',
    recommendedBoards: 'Disarankan untuk Anda',
    noRecentBoardTexts: [
      'Apakah ini pertama kalinya',
      'Anda menggunakan Fan Plus?',
      'Cari bintang favoritmu!',
    ],
    buttonSearch: 'Cari',
    allCategory: 'Semua',
    postCount: 'Posts',
    link: { board: '/in/community/board' },
    noResult: ['Tidak ada hasil', 'Silakan periksa kembali nama selebritinya.'],
  },
  ja: {
    community: 'コミュニティ',
    boards: 'すべて',
    boardMain: 'すべて',
    bestPopular: '最も人気（ライブ）',
    recentlyBoards: '最近訪れた掲示板',
    recommendedBoards: 'おすすめ掲示板',
    noRecentBoardTexts: ['ファンプラスを利用するのは初めてですか?', 'お気に入りのスターを探せ！'],
    buttonSearch: '検索',
    allCategory: '全',
    postCount: '掲示文',
    link: { board: '/ja/community/board' },
    noResult: ['検索結果がありません。', '芸能人の名前をもう一度確認してください'],
  },
  vi: {
    community: 'Cộng đồng',
    boards: 'Tất cả',
    boardMain: 'Tất cả',
    bestPopular: 'Phổ biến nhất (hiện tại)',
    recentlyBoards: 'Ban đã ghé thăm gần đây',
    recommendedBoards: 'Được đề xuất cho của bạn',
    noRecentBoardTexts: [
      'Đây có phải là lần đầu tiên',
      'bạn sử dụng Fan Plus?',
      'Hãy tìm kiếm ngôi sao yêu thích của bạn!',
    ],
    buttonSearch: 'Tìm kiếm',
    allCategory: 'Tất cả',
    postCount: 'Câu chuyện',
    link: { board: '/vi/community/board' },
    noResult: ['Không có kết quả', 'Vui lòng kiểm tra lại tên người nổi tiếng.'],
  },
  'zh-CN': {
    community: '社区',
    boards: '全部',
    boardMain: '全部',
    bestPopular: '热门（实时）',
    recentlyBoards: '最近浏览的消息面板',
    recommendedBoards: '推荐的消息面板',
    noRecentBoardTexts: ['您是FanPlus新手吗？', '搜索你最喜欢的明星！'],
    buttonSearch: '搜索',
    allCategory: '全部',
    postCount: '帖子',
    link: { board: '/zh-CN/community/board' },
    noResult: ['没有搜索结果。', '请再检查一下明星的名字'],
  },
  'zh-TW': {
    community: '社區',
    boards: '全部',
    boardMain: '全部',
    bestPopular: '熱門（即時）',
    recentlyBoards: '最近瀏覽的消息面板',
    recommendedBoards: '推薦的消息面板',
    noRecentBoardTexts: ['您是FanPlus新手嗎？', '搜索你最喜歡的明星！'],
    buttonSearch: '搜索',
    allCategory: '全部',
    postCount: '帖子',
    link: { board: '/zh-TW/community/board' },
    noResult: ['沒有搜索結果。', '請再檢查一下明星的名字。'],
  },
};
