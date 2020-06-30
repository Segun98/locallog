import Header from "./Header";
import Head from "next/head";

export default function Layout(props) {
  return (
    <div>
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/logo.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/logo.png"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/images/logo.png" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
          />
          <script
            data-ad-client="ca-pub-8308755574802635"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        </Head>
      </div>
      <Header />
      {props.children}
    </div>
  );
}
