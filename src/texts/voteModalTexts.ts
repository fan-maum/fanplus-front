import type { LangStringType } from '@/types/common';
import type { VoteModalTextType } from '@/types/textTypes';
import type { voteModalTextProps } from '@/types/vote';

type VoteModalFuncType = ({
  dailyTicketCount,
  starName,
  moreVoteCount,
}: voteModalTextProps) => VoteModalTextType;

export const voteModalTexts: LangStringType<VoteModalFuncType> = {
  ko: ({ dailyTicketCount, starName, moreVoteCount }) => {
    return {
      voteProcess: `<span>${starName}</span>님에게<br/><b>무료로 ${dailyTicketCount}표</b> 투표하시겠어요?`,
      voteDoneFirst: `<span>${starName}</span> 님에게<br/><b>무료로 ${dailyTicketCount}표</b> 투표 되었어요.`,
      voteDoneEnd: `<b>팬플러스 앱에서 ${moreVoteCount}표</b> 더 투표해보세요!`,
      voteBlockFirst: `하루에 한 번 투표에 참여할 수 있어요.<br/>(매일 0시 기준으로 초기화 됩니다)`,
      voteBlockEnd: `팬플러스 앱 설치하면<br/>매일 <b>${moreVoteCount}표</b>를 드리고 있어요.`,
    };
  },
  en: ({ dailyTicketCount, starName, moreVoteCount }) => {
    return {
      voteProcess: `Do you want to user <b>${dailyTicketCount} VTs for free</b> to vote<br/>for <span>${starName}</span>?`,
      voteDoneFirst: `<b>${dailyTicketCount} VTs</b> have been used for free to vote<br/>for <span>${starName}</span>.`,
      voteDoneEnd: `Vote for your star with <b>${moreVoteCount} more VTs on FanPlus!</b>`,
      voteBlockFirst: `You can participate in the vote only once per day.<br/>(Free vote is renewed at 00:00 KST)`,
      voteBlockEnd: `<b>${moreVoteCount}</b> voting tickets are given away everyday<br/>for FanPlus app users.`,
    };
  },
  es: ({ dailyTicketCount, starName, moreVoteCount }) => {
    return {
      voteProcess: `¿Votaría <b>${dailyTicketCount} voto(s)</b> gratis parael <span>${starName}</span>`,
      voteDoneFirst: `Para <span>${starName}</span>,<br/><b>${dailyTicketCount} voto(s)</b> fueron gratis`,
      voteDoneEnd: `Voten más <b>${moreVoteCount} voto(s)</b> en la aplicación FanPlus!`,
      voteBlockFirst: `Pueden votar una vez al día<br/>La hora estándar es 00:00 (hora coreana)`,
      voteBlockEnd: `Si instalan la aplicación FanPlus se puede obtener  <b>${moreVoteCount}</b> voto(s) cada día`,
    };
  },
  in: ({ dailyTicketCount, starName, moreVoteCount }) => {
    return {
      voteProcess: `Apakah Anda ingin memilih <b>${dailyTicketCount}</b> suara secara gratis untuk <span>${starName}</span>?`,
      voteDoneFirst: `<span>${starName}</span> mendapat <b>${dailyTicketCount}</b> suara gratis.`,
      voteDoneEnd: `Pilih lebih banyak <b>${moreVoteCount}suara</b> di aplikasi FanPlus!`,
      voteBlockFirst: `Anda dapat memilih sekali per hari<br/>(gratis suara bebas diperbarui pukul 00:00 KST)`,
      voteBlockEnd: `FanPlus app Instal aplikasinya.<br/>Anda mendapatkan <b>${moreVoteCount}</b> suara memberikan suara setiap hari`,
    };
  },
  ja: ({ dailyTicketCount, starName, moreVoteCount }) => {
    return {
      voteProcess: `<span>${starName}</span>様へ<b>${dailyTicketCount}</b>票を無料で 投票しますか？`,
      voteDoneFirst: `<span>${starName}</span>様へ無料で<b>${dailyTicketCount}</b>票が投票されました`,
      voteDoneEnd: ` FanPlusアプリでさらに<b>${moreVoteCount}</b>票投票してみてください！`,
      voteBlockFirst: `1日に1回投票に参加できます<br/>(無料投票は 00:00 KSTに更新されます）`,
      voteBlockEnd: `FanPlusアプリをインストールすると<br/>毎日 <b>${moreVoteCount}</b>票差し上げます`,
    };
  },
  vi: ({ dailyTicketCount, starName, moreVoteCount }) => {
    return {
      voteProcess: `Bạn có muốn bình chọn phiếu <b>${dailyTicketCount}</b> miễn phí cho <span>${starName}</span> không?`,
      voteDoneFirst: `Bạn đã bỏ phiếu xong phiếu <b>${dailyTicketCount}</b> miễn phí cho <span>${starName}</span>`,
      voteDoneEnd: `Bạn hãy bình chọn thêm phiếu <b>${moreVoteCount}</b> ở app FanPlus!`,
      voteBlockFirst: `Một ngày chỉ có một lần được bình chọn<br/>(Phiếu bầu miễn phí sẽ được gia hạn vào lúc 00:00 KST)`,
      voteBlockEnd: `Nếu bạn tải appFanPlus,<br/>chúng tôi sẽ tặng thêm phiếu <b>${moreVoteCount}</b> mỗi ngày`,
    };
  },
  'zh-CN': ({ dailyTicketCount, starName, moreVoteCount }) => {
    return {
      voteProcess: `您想给<span>${starName}</span>免费投票吗？`,
      voteDoneFirst: `给<span>${starName}</span>投票了。`,
      voteDoneEnd: `请在FanPlus应用投<b>${moreVoteCount}</b>票`,
      voteBlockFirst: `您每天只能参与一次投票。<br/>(免费投票00:00 KST重新设置)`,
      voteBlockEnd: `下载FanPlus,<br/>每天赠送<b>${moreVoteCount}</b>票。`,
    };
  },
  'zh-TW': ({ dailyTicketCount, starName, moreVoteCount }) => {
    return {
      voteProcess: `您想給<span>${starName}</span>免費投票嗎？`,
      voteDoneFirst: `給<span>${starName}</span>投票了。`,
      voteDoneEnd: `请在FanPlus應用投<b>${moreVoteCount}</b>票`,
      voteBlockFirst: `您每天只能參與一次投票。<br/>(免費投票00:00 KST重新設置)`,
      voteBlockEnd: `下載FanPlus,<br/>每天贈送<b>${moreVoteCount}</b>票。`,
    };
  },
};
