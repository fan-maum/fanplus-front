import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  return (
    <RecoilRoot>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
        onLoad={kakaoInit}
      />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
