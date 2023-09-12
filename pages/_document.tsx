import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <title>탄생수 계산기 - 탄생수로 알아보는 나의 특징</title>
          <meta name="keywords" content="탄생수,테스트,심리,성격,유형" />
          <meta
            name="description"
            content="탄생수로 알아보는 성격유형과 특징을 알아보세요!"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            property="og:site_name"
            content="탄생수 계산기 - 탄생수로 알아보는 나의 특징"
          />
          <meta
            property="og:title"
            content="탄생수 계산기 - 탄생수로 알아보는 나의 특징"
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
