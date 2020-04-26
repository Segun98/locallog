import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";

export default function ErrorMessage({ message }) {
  return (
    <Layout>
      <Head>
        <title>Error | Tadlace</title>
      </Head>
      <div className="error-msg">
        <h3>{message}</h3>
      </div>
      <style jsx>
        {`
          .error-msg {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 80vh;
            margin: auto;
            width: 80%;
          }
        `}
      </style>
    </Layout>
  );
}
