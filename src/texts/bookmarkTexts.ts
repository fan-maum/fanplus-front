import type { LangStringType } from '@/types/common';
import { CommmunityBookmarkType } from '@/types/textTypes';

export const bookmarkTexts: LangStringType<CommmunityBookmarkType> = {
  ko: {
    NoBookmarkMessage: `<div>게시판 제목의 <img src="/icons/icon_bookmark.svg" alt="bookmark_icon" />
    아이콘을 <br/> 선택하면 <br/> 즐겨찾기에 추가됩니다.</div>`,
    seeMore: '더보기',
  },
  en: {
    NoBookmarkMessage: `<div>Tap on the <img src="/icons/icon_bookmark.svg" alt="bookmark_icon" />
    icon <br/> to bookmark <br/> a board.</div>`,
    seeMore: 'See more',
  },
  es: {
    NoBookmarkMessage: `<div>Bata en el icono <img src="/icons/icon_bookmark.svg" alt="bookmark_icon" />
    <br/> para marcar <br/> un tablero.</div>`,
    seeMore: 'Ver más',
  },
  in: {
    NoBookmarkMessage: `<div>Ketuk ikon <img src="/icons/icon_bookmark.svg" alt="bookmark_icon" />
    <br/> untuk menandai <br/> suatu papan.</div>`,
    seeMore: 'Lihat lebih banyak',
  },
  ja: {
    NoBookmarkMessage: `<div><img src="/icons/icon_bookmark.svg" alt="bookmark_icon" />
    アイコンをタッ <br/> プしてボードを <br/> ブックマークします。</div>`,
    seeMore: '詳細を見る',
  },
  vi: {
    NoBookmarkMessage: `<div>Nhấn vào biểu tượng <img src="/icons/icon_bookmark.svg" alt="bookmark_icon" />
    <br/> để đánh <br/> dấu một bảng.</div>`,
    seeMore: 'Xem thêm',
  },
  'zh-CN': {
    NoBookmarkMessage: `<div>点击 <img src="/icons/icon_bookmark.svg" alt="bookmark_icon" />
    <br/> 即可为关注</div>`,
    seeMore: '查看详情',
  },
  'zh-TW': {
    NoBookmarkMessage: `<div>點擊 <img src="/icons/icon_bookmark.svg" alt="bookmark_icon" />
    <br/> 即可為關注</div>`,
    seeMore: '查看詳情',
  },
};
