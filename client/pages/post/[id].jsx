import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ReactHtmlParser from "react-html-parser"


const POST_QUERY = gql`
  query post($id: ID) {
    post(id: $id) {
      id
      title
      description
      count
      url
    }
  }
`;
export default function index() {
  const router = useRouter();
  const { id } = router.query;
// console.log(router);
  const [graphpost, setgraphpost] = useState([]);

  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: {
      id: id,
    },
    notifyOnNetworkStatusChange: true,
  });

  function fetchPost() {
    try {
      const { post } = data;
      setgraphpost(post);
    } catch (err) {
      console.log(err.message);
      router.push("/404")
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])


  return (
    <Layout>
      <Head>
        <title>{graphpost.title} | Tadlace</title>
      </Head>
      <div style={{ margin: "0 auto", width: "70%" }}>
        <div>{graphpost.title}</div>
        <div>{graphpost.count}</div>
        <div>{graphpost.url}</div>
        <img src={`${graphpost.url}`} alt={graphpost.id} />
        <li>{ReactHtmlParser(graphpost.description)}</li>
        <style jsx>
          {`
            p {
              color: black;
            }
          `}
        </style>
      </div>
    </Layout>
  );
}
