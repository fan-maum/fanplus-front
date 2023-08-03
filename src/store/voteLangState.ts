import { atomFamily } from 'recoil';
import { Votes_Text_ko, VoteDetail_Text_ko } from '@/texts/ko';
import { Votes_Text_en, VoteDetail_Text_en } from '@/texts/en';
import { Votes_Text_es, VoteDetail_Text_es } from '@/texts/es';
import { Votes_Text_in, VoteDetail_Text_in } from '@/texts/in';
import { Votes_Text_ja, VoteDetail_Text_ja } from '@/texts/ja';
import { Votes_Text_vi, VoteDetail_Text_vi } from '@/texts/vi';
import { Votes_Text_zh, VoteDetail_Text_zh } from '@/texts/zh-CN';
import { Votes_Text_zhtw, VoteDetail_Text_zhtw } from '@/texts/zh-TW';

export const voteLangState = atomFamily({
  key: 'voteLangState',
  default: (id: string) => {
    if (id === 'ko') return Votes_Text_ko;
    if (id === 'en') return Votes_Text_en;
    if (id === 'es') return Votes_Text_es;
    if (id === 'in') return Votes_Text_in;
    if (id === 'ja') return Votes_Text_ja;
    if (id === 'vi') return Votes_Text_vi;
    if (id === 'zh-CN') return Votes_Text_zh;
    if (id === 'zh-TW') return Votes_Text_zhtw;
  },
});

export const voteDetailLangState = atomFamily({
  key: 'voteDetailLangState',
  default: (id: string) => {
    if (id === 'ko') return VoteDetail_Text_ko;
    if (id === 'en') return VoteDetail_Text_en;
    if (id === 'es') return VoteDetail_Text_es;
    if (id === 'in') return VoteDetail_Text_in;
    if (id === 'ja') return VoteDetail_Text_ja;
    if (id === 'vi') return VoteDetail_Text_vi;
    if (id === 'zh-CN') return VoteDetail_Text_zh;
    if (id === 'zh-TW') return VoteDetail_Text_zhtw;
  },
});
