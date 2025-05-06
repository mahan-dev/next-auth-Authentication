import Document, { Html, Head, Main, NextScript } from "next/document";

class Documents extends Document {
  render() {
    return (
      <Html lang="fa" >
        <Head>
            <meta name="main Docs" content="docs info" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Documents