import type { LangStringType } from '@/types/common';
import { CommmunityBookmarkType } from '@/types/textTypes';

export const bookmarkTexts: LangStringType<CommmunityBookmarkType> = {
  ko: {
    canBookmarkMessage: ['자주 찾는 게시판을', '즐겨찾기 할 수 있습니다.'],
    NoBookmarkMessage: `<div>게시판 제목의 <img src="/icons/icon_star.svg" alt="bookmark_icon" />
    아이콘을 선택하면 <br/> 즐겨찾기에 추가됩니다.</div>`,
    seeMore: '더보기',
    seeSideBar: '게시판 메뉴 보기',
  },
  en: {
    canBookmarkMessage: ['Bookmark your favorite boards', 'for easy access.'],
    NoBookmarkMessage: `<div>Tap on the <img src="/icons/icon_star.svg" alt="bookmark_icon" />
    icon to bookmark <br/> a board.</div>`,
    seeMore: 'See more',
    seeSideBar: 'See all boards',
  },
  es: {
    canBookmarkMessage: ['Marque sus tablas favoritas para', 'facilitar el acceso.'],
    NoBookmarkMessage: `<div>Bata en el icono <img src="/icons/icon_star.svg" alt="bookmark_icon" />
    para marcar <br/> un tablero.</div>`,
    seeMore: 'Ver más',
    seeSideBar: 'Ver todos los tableros',
  },
  in: {
    canBookmarkMessage: ['Tandai papan favorit Anda', 'untuk akses mudah.'],
    NoBookmarkMessage: `<div>Ketuk ikon <img src="/icons/icon_star.svg" alt="bookmark_icon" />
    untuk menandai <br/> suatu papan.</div>`,
    seeMore: 'Lihat lebih banyak',
    seeSideBar: 'Lihat semua papan',
  },
  ja: {
    canBookmarkMessage: ['お気に入りのボードをブックマークして', '簡単にアクセスできます。'],
    NoBookmarkMessage: `<div><img src="/icons/icon_star.svg" alt="bookmark_icon" />
    アイコンをタッ プしてボードを <br/> ブックマークします。</div>`,
    seeMore: '詳細を見る',
    seeSideBar: 'すべての掲示板を見る',
  },
  vi: {
    canBookmarkMessage: ['Đánh dấu các bảng yêu thích', 'của bạn để dễ dàng truy cập.'],
    NoBookmarkMessage: `<div>Nhấn vào biểu tượng <img src="/icons/icon_star.svg" alt="bookmark_icon" />
    để đánh <br/> dấu một bảng.</div>`,
    seeMore: 'Xem thêm',
    seeSideBar: 'Xem tất cả các bảng thông báo',
  },
  'zh-CN': {
    canBookmarkMessage: ['关注您最喜欢的消息面板', '以便于访问。'],
    NoBookmarkMessage: `<div>点击 <img src="/icons/icon_star.svg" alt="bookmark_icon" />
    即可为关注</div>`,
    seeMore: '查看详情',
    seeSideBar: '查看所有消息面板',
  },
  'zh-TW': {
    canBookmarkMessage: ['關注您最喜歡的訊息面板', '以便於訪問。'],
    NoBookmarkMessage: `<div>點擊 <img src="/icons/icon_star.svg" alt="bookmark_icon" />
    即可為關注</div>`,
    seeMore: '查看詳情',
    seeSideBar: '查看所有訊息面板',
  },
};
