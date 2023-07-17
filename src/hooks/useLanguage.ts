import { useRouter } from 'next/router';

export function getLanguage() {
  const router = useRouter();
  const language = router.route.split('/')[1];
  return language === 'votes' ? 'ko' : language;
}
