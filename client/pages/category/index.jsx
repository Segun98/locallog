import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Head from "next/head";
import CategoryList from "../../components/CategoryList";
import { request } from "graphql-request";

const ALL_POSTS_QUERY = `
  {
    posts {
      id
      title
      author
      date
      url
      category
    }
  }
`;

export async function getServerSideProps() {

  // const localendpoint = "http://localhost:8080/graphql"
  const prodendpoint = "https://backlog.now.sh/graphql"
  const res = await request(prodendpoint, ALL_POSTS_QUERY);
  const posts = await res.posts;

  return {
    props: {
      posts,
    },
  };
}

export default function Index({ posts }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { query } = router;

  const capitalize = (s) => {
    try {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    } catch (err) {
      console.log(err);
    }
  };

  function truncateTitle(str) {
    if (str.length > 80) {
      return str.slice(0, 80) + "...";
    } else {
      return str;
    }
  }

  function truncateAlt(str) {
    if (str.length > 20) {
      return str.slice(0, 20);
    } else {
      return str;
    }
  }

  const filteredCategory = posts.filter(
    (post) => post.category === capitalize(query.category)
  );

  return (
    <Layout>
      <Head>
        <title> {filteredCategory[0].category} | Category</title>
      </Head>
      <div className="category">
        <div className="category-header">
          <h2>Category - {capitalize(query.category)}</h2>
        </div>

        <div className="category-items-wrap">
          {filteredCategory.map((allPosts) => (
            <CategoryList
              key={allPosts.id}
              href={`/post/${allPosts.id}`}
              src={`${allPosts.url}`}
              alt={truncateAlt(`${allPosts.title}`)}
              title={truncateTitle(allPosts.title)}
              author={allPosts.author}
              date={allPosts.date}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
