import type { LangStringType } from '@/types/common';
import type { CommunityBoardTextType } from '@/types/textTypes';

export const communityBoardTexts: LangStringType<CommunityBoardTextType> = {
  ko: {
    all: '전체',
    recommendCount: '추천수',
    viewCount: '조회수',
    commentCount: '댓글',
    popular: '인기',
    daysAgo: '일 전',
    hoursAgo: '시간 전',
    minsAgo: '분 전',
    bottomTabBar: {
      write: '글쓰기',
      all: '전체글',
      popular: '인기글',
      notice: '공지',
      myPost: '내가 쓴 글',
      bookmark: '즐겨찾기',
    },
    boardLang: {
      modalHeader: '게시글 언어 선택',
      modalExplain: '선택한 언어로 작성된 게시글만 보입니다!',
      current: '현재 사용 중인 언어필터',
      ALL: '모든 언어',
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: '中文(简体)',
      es: 'Español',
      vi: 'Tiếng việt',
      id: 'Bahasa Indonesia',
      zhtw: '中文(繁體)',
    },
    noPostTexts: ['게시글이 없습니다.', '제일 먼저 게시글을 남겨주세요.'],
    noMyPostTexts: ['작성된 글이 없습니다.'],
    buttonWrite: '글쓰기',
    link: {
      board: '/ko/community/board',
    },
    permissionModal: {
      noPermission: '게시글 작성 권한이 없습니다.',
      check: '확인',
    },
    langSelectorToolTip: '게시글 언어를 선택해 주세요',
    notice: '공지',
  },
  en: {
    all: 'All',
    recommendCount: 'Like',
    viewCount: 'View',
    commentCount: 'Comment',
    popular: 'Popular',
    daysAgo: 'days ago',
    hoursAgo: 'hours ago',
    minsAgo: 'mins ago',
    bottomTabBar: {
      write: 'Write',
      all: 'All',
      popular: 'Trending',
      notice: 'Notice',
      myPost: 'My Posts',
      bookmark: 'Bookmarks',
    },
    boardLang: {
      modalHeader: 'Posts Language Settings',
      modalExplain: 'You can only see the post written in the selected language.',
      current: 'The current language',
      ALL: 'All languages',
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: '中文(简体)',
      es: 'Español',
      vi: 'Tiếng việt',
      id: 'Bahasa Indonesia',
      zhtw: '中文(繁體)',
    },
    noPostTexts: ['There is no post.', 'Write a first post.'],
    noMyPostTexts: ['There is no post.'],
    buttonWrite: 'Write',
    link: {
      board: '/en/community/board',
    },
    permissionModal: {
      noPermission: 'You do not have permission to post.',
      check: 'Check',
    },
    langSelectorToolTip: 'Please select a language',
    notice: 'Notice',
  },
  es: {
    all: 'Total',
    recommendCount: 'Gusta',
    viewCount: 'Número de búsquedas',
    commentCount: 'Comentario',
    popular: 'Popular',
    daysAgo: 'Día(s) antes',
    hoursAgo: 'Hora(s) antes',
    minsAgo: 'Minuto(s) antes',
    bottomTabBar: {
      write: 'Escribir',
      all: 'TODO',
      popular: 'Popular',
      notice: 'Aviso',
      myPost: 'El texto que escribí',
      bookmark: 'Marca de libro',
    },
    boardLang: {
      modalHeader: 'Publicación Idioma configurado',
      modalExplain: 'Pueden ver texto escrito en la lengua seleccionada!',
      current: 'Filtro lingüístico actualmente en uso',
      ALL: 'Todos los idiomas',
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: '中文(简体)',
      es: 'Español',
      vi: 'Tiếng việt',
      id: 'Bahasa Indonesia',
      zhtw: '中文(繁體)',
    },
    noPostTexts: ['No hay ninguna publicación.', 'Sé el primero en dejar una publicación.'],
    noMyPostTexts: ['No hay publicaciones escritas.'],
    buttonWrite: 'Escribir',
    link: {
      board: '/es/community/board',
    },
    permissionModal: {
      noPermission: 'No tienes permiso para publicar.',
      check: 'Confirmar',
    },
    langSelectorToolTip: 'Por favor, seleccione un idioma',
    notice: 'Aviso',
  },
  in: {
    all: 'Semua',
    recommendCount: 'Seperti',
    viewCount: 'Lihat',
    commentCount: 'Komentar',
    popular: 'Populer',
    daysAgo: 'hari sebelumnya',
    hoursAgo: 'jam sebelumnya',
    minsAgo: 'menit sebelumnya',
    bottomTabBar: {
      write: 'Tulis',
      all: 'SEMUA',
      popular: 'Populer',
      notice: 'Pengumuman',
      myPost: 'Cerita Saya',
      bookmark: 'Markah buku',
    },
    boardLang: {
      modalHeader: 'Posts Pengaturan Bahasa',
      modalExplain: 'Anda dapat melihat teks yang ditulis dalam bahasa yang dipilih',
      current: 'Filter bahasa yang kini dipakai',
      ALL: 'Semua bahasa',
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: '中文(简体)',
      es: 'Español',
      vi: 'Tiếng việt',
      id: 'Bahasa Indonesia',
      zhtw: '中文(繁體)',
    },
    noPostTexts: ['Tidak ada postingan', 'Jadilah orang pertama', 'yang meninggalkan postingan'],
    noMyPostTexts: ['Tidak ada postingan yang ditulis'],
    buttonWrite: 'Tulis',
    link: {
      board: '/in/community/board',
    },
    permissionModal: {
      noPermission: 'Anda tidak memiliki izin untuk memposting.',
      check: 'Memeriksa',
    },
    langSelectorToolTip: 'Silakan pilih bahasa',
    notice: 'Pengumuman',
  },
  ja: {
    all: '全',
    recommendCount: 'おすすめ',
    viewCount: 'ヒット',
    commentCount: 'コメント',
    popular: '人気',
    daysAgo: '日 前',
    hoursAgo: '時間 前',
    minsAgo: '分 前',
    bottomTabBar: {
      write: '書き込み',
      all: '全て',
      popular: '人気',
      notice: '通知',
      myPost: '私が書いた記事',
      bookmark: 'ブックマーク',
    },
    boardLang: {
      modalHeader: '話 設定言語',
      modalExplain: '選択した言語で書かれたテキストを見ることができます!',
      current: 'すべての言語',
      ALL: 'すべての言語',
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: '中文(简体)',
      es: 'Español',
      vi: 'Tiếng việt',
      id: 'Bahasa Indonesia',
      zhtw: '中文(繁體)',
    },
    noPostTexts: ['投稿はありません', '最初に投稿を残してください'],
    noMyPostTexts: ['書かれた投稿はありません'],
    buttonWrite: '書き込み',
    link: {
      board: '/ja/community/board',
    },
    permissionModal: {
      noPermission: '投稿する許可がありません。',
      check: '確認',
    },
    langSelectorToolTip: '言語を選択してください',
    notice: 'お知らせ',
  },
  vi: {
    all: 'Tất cả',
    recommendCount: 'Giống như',
    viewCount: 'Xem',
    commentCount: 'Bình luận',
    popular: 'Nổi tiếng',
    daysAgo: 'Ngày trước',
    hoursAgo: 'Giờ trước',
    minsAgo: 'Phút trước',
    bottomTabBar: {
      write: 'Viết',
      all: 'TẤT CẢ',
      popular: 'Nổi tiếng',
      notice: 'Thông báo',
      myPost: 'Câu chuyện của tôi',
      bookmark: 'Đánh dấu',
    },
    boardLang: {
      modalHeader: 'Câu chuyện Thiết lập ngôn ngữ',
      modalExplain: 'Bạn có thể thấy văn bản được viết bằng ngôn ngữ đã chọn!',
      current: 'Bộ lọc ngôn ngữ hiện đang được sử dụng',
      ALL: 'Tất cả các ngôn ngữ',
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: '中文(简体)',
      es: 'Español',
      vi: 'Tiếng việt',
      id: 'Bahasa Indonesia',
      zhtw: '中文(繁體)',
    },
    noPostTexts: ['Không có bài viết nào', 'Hãy là người đầu tiên để lại bài viết'],
    noMyPostTexts: ['Không có bài viết nào được viết'],
    buttonWrite: 'Viết',
    link: {
      board: '/vi/community/board',
    },
    permissionModal: {
      noPermission: 'Bạn không có quyền đăng bài',
      check: 'Xác nhận',
    },
    langSelectorToolTip: 'Vui lòng chọn một ngôn ngữ',
    notice: 'Thông báo',
  },
  'zh-CN': {
    all: '全部',
    recommendCount: '推荐',
    viewCount: '阅读数',
    commentCount: '评论',
    popular: '人气',
    daysAgo: '日 前',
    hoursAgo: '小时 前',
    minsAgo: '分钟 前',
    bottomTabBar: {
      write: '发帖子',
      all: '全部',
      popular: '热门文章',
      notice: '公告',
      myPost: '我发的贴子',
      bookmark: '关注',
    },
    boardLang: {
      modalHeader: '帖子 语言设定',
      modalExplain: '您只能看到以所选语言撰写的帖子',
      current: '当前使用的语言',
      ALL: '全部语言',
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: '中文(简体)',
      es: 'Español',
      vi: 'Tiếng việt',
      id: 'Bahasa Indonesia',
      zhtw: '中文(繁體)',
    },
    noPostTexts: ['没有帖子。', '成为第一个发表帖子的人'],
    noMyPostTexts: ['没有帖子。'],
    buttonWrite: '发帖子',
    link: {
      board: '/zh-CN/community/board',
    },
    permissionModal: {
      noPermission: '您没有发帖权限',
      check: '确认',
    },
    langSelectorToolTip: '请选择语言',
    notice: '公告',
  },
  'zh-TW': {
    all: '全部',
    recommendCount: '推薦',
    viewCount: '閱讀數',
    commentCount: '評論',
    popular: '人氣',
    daysAgo: '日 前',
    hoursAgo: '小時 前',
    minsAgo: '分鐘 前',
    bottomTabBar: {
      write: '發帖子',
      all: '全部',
      popular: '熱門文章',
      notice: '公告',
      myPost: '我發的貼子',
      bookmark: '關注',
    },
    boardLang: {
      modalHeader: '帖子 語言設定',
      modalExplain: '您只能看到以所選語言撰寫的帖子',
      current: '当前使用的语言',
      ALL: '全部語言',
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: '中文(简体)',
      es: 'Español',
      vi: 'Tiếng việt',
      id: 'Bahasa Indonesia',
      zhtw: '中文(繁體)',
    },
    noPostTexts: ['沒有帖子。', '成為第一個發表帖子的人'],
    noMyPostTexts: ['沒有帖子。'],
    buttonWrite: '發帖子',
    link: {
      board: '/zh-TW/community/board',
    },
    permissionModal: {
      noPermission: '您沒有發帖權限',
      check: '確認',
    },
    langSelectorToolTip: '請選擇語言',
    notice: '公告',
  },
};
