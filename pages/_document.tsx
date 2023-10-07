import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <title>드라마 시청률 순위 모아보기</title>
          <meta name="keywords" content="드라마,시청률,추이,방송사" />
          <meta
            name="description"
            content="드라마 시청률 순위와 드라마별 시청률 추이를 한눈에 알아 볼 수 있어요."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            property="og:site_name"
            content="드라마 시청률 순위 - 방송사 통합 드라마 시청률 순위와 추이"
          />
          <meta
            property="og:title"
            content="드라마 시청률 순위 - 방송사 통합 드라마 시청률 순위와 추이"
          />
          <meta property="og:url" content="https://emoticon.sooyadev.com/" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content="#3182CE" />
          <link rel="manifest" href="/manifest.json" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6788425959877259"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
