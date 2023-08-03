import { useRouter } from 'next/router';

export function GetLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];
  return language;
}

export function GetRouterLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];

  if (language === 'in') return 'id';
  else if (language === 'zh-CN') return 'zh';
  else if (language === 'zh-TW') return 'zhtw';
  else return language;
}

export function getVoteDetailLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];

  if (language === 'ko') return 'ko';
  if (language === 'en') return 'en';
  if (language === 'ja') return 'ja';
  if (language === 'vi') return 'vi';
  if (language === 'in') return 'id';
  if (language === 'zh-CN') return 'zh';
  if (language === 'es') return 'en';
  if (language === 'zh-TW') return 'en';
}
