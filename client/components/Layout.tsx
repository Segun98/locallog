import Header from "./Header";
import Head from "next/head";

export default function Layout(props: any) {
  return (
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
      </Head>
      <Header />
      {props.children}
    </div>
  );
}
