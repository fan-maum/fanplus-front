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

  if (language === 'ko' || language === 'votes') return 'ko';
  if (language === 'en') return 'en';
  if (language === 'ja') return 'ja';
  if (language === 'vi') return 'vi';
  if (language === 'in') return 'id';
  if (language === 'zh-rCN') return 'zh';
  if (language === 'es') return 'en';
  if (language === 'zh-rTW') return 'en';
}
