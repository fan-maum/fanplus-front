import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { GTM_NOSCRIPT, GTM_SCRIPT } from '@/utils/gtm';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }}
        />
        <link rel="icon" href="/fanplus-favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <meta name="naver-site-verification" content="4d5dbdbe2508c448e840647635819a72e499c28e" />
      </Head>
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: GTM_NOSCRIPT }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
