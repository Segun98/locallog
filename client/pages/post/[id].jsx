import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import ReactHtmlParser from "react-html-parser";
import MostPopular from "../../components/MostPopular";
import Footer from "../../components/Footer";
import { request } from "graphql-request";

const POSTS_QUERY = `
query post($id: ID) {
      post(id: $id) {
        id
        title
        description
        count
        url
        author
        date
      }
    }
`;

export async function getServerSideProps({ params }) {
  const variables = {
    id: params.id,
  };
  const res = await request(
    "https://backlog.now.sh/graphql",
    POSTS_QUERY,
    variables
  );
  const post = await res.post; 

  return {
    props: {
      post,
    },
  };
}

function index({ post }) {

  function truncateAlt(str) {
    if (str.length > 20) {
      return str.slice(0, 20);
    } else {
      return str;
    }
  }

  if (process.browser) {
    // client-side-only code
    var host = "https://" + window.location;
  }

  return (
    <Layout>
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
          <meta property="og:type" content="website" />
          <title>{post.title} | Tadlace</title>
          <meta name="Description" content={post.title} />
          <meta name="keywords" content={post.title} />
          <meta name="author" content={post.author} />
          <meta property="og:description" content={post.title} />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.title} />
          <meta name="twitter:image" content={post.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${host}/post/${post.id}`} />
          <meta property="og:title" content={post.title} />
          <meta property="og:image" content={post.url} />
          <meta property="og:site_name" content={post.title} />
          <meta property="article:publisher" content={post.author} />
          <meta property="article:author" content={post.author} />
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </Head>
      </div>
      <div className="single-post">
        <div className="header-image">
          <img src={`${post.url}`} alt={truncateAlt(`${post.title}`)} />
        </div>
        <h2 className="single-post-title">{post.title}</h2>
        <hr />
        <div className="post-sub-head">
          <div>
            <p>By - {post.author}</p>
            <p>{post.date}</p>
          </div>
          <aside style={{ display: "flex" }}>
            <div className="views-count">Views - {post.count}</div>
            <div style={{ display: "flex" }}>
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                data-text={post.title}
                data-show-count="true"
                className="twitter-share-button"
              >
                Tweet
              </a>
            </div>
          </aside>
        </div>
        <hr />
        <div className="single-post-body">
          {ReactHtmlParser(post.description)}
        </div>
        <hr />
        <section style={{ marginBottom: "20px" }}>
          <br />
          <h2 style={{ marginBottom: "15px" }}>Share Post</h2>
          <p>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              data-text={post.title}
              data-show-count="true"
              className="twitter-share-button"
            >
              Tweet
            </a>
          </p>
        </section>
        <MostPopular />
        <Footer />
      </div>
    </Layout>
  );
}

export default index;
