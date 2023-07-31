import { useRouter } from 'next/router';

export function GetLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];
  return language === 'votes' ? 'ko' : language === 'voteDetail' ? 'ko' : language;
}

export function GetRouterLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];
  if (language === 'ko' || language === 'votes' || language === 'voteDetail') return 'ko';
  else if (language === 'in') return 'id';
  else if (language === 'zh-rCN') return 'zh';
  else if (language === 'zh-rTW') return 'zhtw';
  else return language;
}
