import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";

export default function Index() {
  function upperCase(item) {
    return item.toUpperCase();
  }
  return (
    <Layout>
      <Head>
        <title>Profile | Tadlace</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1>{upperCase("Profile!")}</h1>
      </div>
    </Layout>
  );
}
