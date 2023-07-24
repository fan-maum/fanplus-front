import { atomFamily } from 'recoil';
import { Votes_Text_ko } from '@/texts/ko';
import { Votes_Text_en } from '@/texts/en';
import { Votes_Text_es } from '@/texts/es';
import { Votes_Text_in } from '@/texts/in';
import { Votes_Text_ja } from '@/texts/ja';
import { Votes_Text_vi } from '@/texts/vi';
import { Votes_Text_zh } from '@/texts/zh-rCN';
import { Votes_Text_zhtw } from '@/texts/zh-rTW';

export const voteLangState = atomFamily({
  key: 'voteLangState',
  default: (id: string) => {
    if (id === 'ko' || id === 'votes') return Votes_Text_ko;
    if (id === 'en') return Votes_Text_en;
    if (id === 'es') return Votes_Text_es;
    if (id === 'in') return Votes_Text_in;
    if (id === 'ja') return Votes_Text_ja;
    if (id === 'vi') return Votes_Text_vi;
    if (id === 'zh-rCN') return Votes_Text_zh;
    if (id === 'zh-rTW') return Votes_Text_zhtw;
  },
});