import type { LangStringType } from '@/types/common';
import type { VoteDetailPageTextType } from '@/types/textTypes';

export const voteDetailPageTexts: LangStringType<VoteDetailPageTextType> = {
  ko: {
    vote: '투표',
    voting: '투표하기',
    board: '게시판',
    voteResult: '투표 결과',
    voteEnded: '투표가 마감되었습니다.',
    voteDifference: {
      front: null,
      back: '표 차이',
    },
    seeMore: '자세히 알아보기',
    currentVote: '표',
    prizeTitle: {
      detail: '상세 내용',
      first: '1위 혜택 보기',
      second: '2위 혜택 보기',
      third: '3위 혜택 보기',
    },
  },
  en: {
    vote: 'Vote',
    voting: 'Vote',
    board: 'Board',
    voteResult: 'Result',
    voteEnded: 'The vote has been closed',
    voteDifference: {
      front: 'Winning by',
      back: 'vote(s)',
    },
    seeMore: 'See More',
    currentVote: 'VT(s)',
    prizeTitle: {
      detail: 'Description',
      first: 'The Prize for Winner',
      second: '2nd Winner Prize',
      third: '3rd Winner Prize',
    },
  },
  es: {
    vote: 'Votación',
    voting: 'Votar',
    board: 'Tablero',
    voteResult: 'Resultado',
    voteEnded: 'La votación está cerrada.',
    voteDifference: {
      front: '¡Diferencia de',
      back: 'votos!',
    },
    seeMore: 'Ver más detalles',
    currentVote: 'votos',
    prizeTitle: {
      detail: 'Detalles',
      first: 'Ver el premio n.° 1',
      second: 'Ver el premio n.° 2',
      third: 'Ver el premio n.° 3',
    },
  },
  in: {
    vote: 'Pemungutan suara',
    voting: 'Beri suara',
    board: 'Papan',
    voteResult: 'Hasil',
    voteEnded: 'Pemungutan suara sudah selesai.',
    voteDifference: {
      front: 'Beda',
      back: 'suara!',
    },
    seeMore: 'Tampilkan Detail',
    currentVote: 'suara',
    prizeTitle: {
      detail: 'Detil',
      first: 'Melihat keuntungan juara 1',
      second: 'Hadiah Pemenang ke-2',
      third: 'Hadiah Pemenang 3',
    },
  },
  ja: {
    vote: '投票',
    voting: '投票する',
    board: '掲示板',
    voteResult: '投票結果',
    voteEnded: '投票が締め切られました。',
    voteDifference: {
      front: null,
      back: '票の得票差!',
    },
    seeMore: '詳細はこちら',
    currentVote: '票',
    prizeTitle: {
      detail: '詳細',
      first: '1等の商品',
      second: '2等の商品',
      third: '3等の商品',
    },
  },
  vi: {
    vote: 'Bỏ phiếu',
    voting: 'Bỏ phiếu',
    board: 'Board',
    voteResult: 'Kết quả',
    voteEnded: 'Hết hạn bỏ phiếu',
    voteDifference: {
      front: null,
      back: 'phiếu chênh lệch',
    },
    seeMore: 'Hiển thị chi tiết',
    currentVote: 'phiếu',
    prizeTitle: {
      detail: 'Nội dung chi tiết',
      first: 'Xem đặc quyền hạng 1',
      second: 'Giải thưởng người chiến thắng thứ hai',
      third: 'Giải thưởng người chiến thắng thứ 3',
    },
  },
  'zh-CN': {
    vote: '投票',
    voting: '投票',
    board: '消息面板',
    voteResult: '投票结果',
    voteEnded: '投票已结束',
    voteDifference: {
      front: null,
      back: '票差距!',
    },
    seeMore: '查看详情',
    currentVote: '票',
    prizeTitle: {
      detail: '详细内容',
      first: '查看第1名奖励',
      second: '查看第2名奖励',
      third: '查看第3名奖励',
    },
  },
  'zh-TW': {
    vote: '投票',
    voting: '投票',
    board: '消息面板',
    voteResult: '投票結果',
    voteEnded: '投票已結束',
    voteDifference: {
      front: null,
      back: '票差距!',
    },
    seeMore: '查看詳情',
    currentVote: '票',
    prizeTitle: {
      detail: '詳細內容',
      first: '查看第1名獎勵',
      second: '查看第2名獎勵',
      third: '查看第3名獎勵',
    },
  },
};