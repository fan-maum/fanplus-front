import { useRouter } from 'next/router';

export function getLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];
  return language === 'votes' ? 'ko' : language === 'voteDetail' ? 'ko' : language;
}

export function getRouterLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];
  if (language === 'ko' || language === 'votes' || language === 'voteDetail') return 'ko';
  else if (language === 'in') return 'id';
  else if (language === 'zh-rCN') return 'zh';
  else if (language === 'zh-rTW') return 'zhtw';
  else return language;
}

export function getVoteDetailLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];

  if (language === 'ko' || language === 'votes') return 'ko_KR';
  if (language === 'en') return 'en_US';
  if (language === 'ja') return 'ja_JP';
  if (language === 'vi') return 'vi_VN';
  if (language === 'in') return 'id_ID';
  if (language === 'zh-rCN') return 'zh_CN';
  if (language === 'es') return 'en_US';
  if (language === 'zh-rTW') return 'en_US';
}
