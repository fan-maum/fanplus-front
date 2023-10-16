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
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: GTM_NOSCRIPT }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
