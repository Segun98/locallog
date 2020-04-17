import Header from "./Header";
import Head from "next/head";

export default function Layout(props: any) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      {props.children}
    </div>
  );
}
