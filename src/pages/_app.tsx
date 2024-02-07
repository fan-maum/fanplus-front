import Layout from '@/components/organisms/Layout';
import '@/styles/globals.css';
import { UrlLangType } from '@/types/common';
import { DefaultSeo } from 'next-seo';
import type { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 1000 * 10,
      cacheTime: 1000 * 60 * 10,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }
  const page = router.pathname.split('/')[2];
  const isNotLayout = page === 'votes' || page === 'thirdParty' || page === 'privacy';

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <DefaultSeo
          title="Fanplus"
          description="팬플러스는 최애가 같은 팬들을 대상으로 다양한 콘텐츠와 소통 기능을 제공하는 종합 덕질 앱이에요. 유일하게 유료 결제 없는 아이돌 생일/기념일 투표를 진행하고 있답니다."
          openGraph={{
            title: '서비스 소개',
            type: 'website',
            url: 'https://fanplus.co.kr',
            siteName: '팬플러스(fanPlus)',
            description:
              '팬플러스는 최애가 같은 팬들을 대상으로 다양한 콘텐츠와 소통 기능을 제공하는 종합 덕질 앱이에요. 유일하게 유료 결제 없는 아이돌 생일/기념일 투표를 진행하고 있답니다.',
            images: [
              {
                url: 'https://fanplus.co.kr/wp-content/uploads/2020/04/fanplus_metatag.png',
              },
            ],
          }}
        />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
          integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
          crossOrigin="anonymous"
          onLoad={kakaoInit}
        />
        {isNotLayout ? (
          <Component {...pageProps} />
        ) : (
          <Layout urlLang={pageProps.urlLang} isWebView={pageProps.isWebView}>
            <Component {...pageProps} />
          </Layout>
        )}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageGetInitialProps = {};
  const isWebView = !!ctx?.req?.headers?.isWebView || false;
  const cookie = !!ctx?.req?.headers?.cookie;
  const urlLang = ctx?.query?.locale as UrlLangType;

  if (Component.getInitialProps) {
    pageGetInitialProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps: {
      isWebView,
      cookie,
      urlLang,
      ...pageGetInitialProps,
    },
  };
};
