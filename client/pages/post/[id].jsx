import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import ReactHtmlParser from "react-html-parser";
import Footer from "../../components/Footer";
import { request } from "graphql-request";
import Related from '../../components/Related'

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
        category
      }
    }
`;

export async function getServerSideProps({ params }) {
  const localendpoint = "http://localhost:8080/graphql";
  // const prodendpoint = "https://backlog.now.sh/graphql"
  const variables = {
    id: params.id,
  };
  const res = await request(localendpoint, POSTS_QUERY, variables);
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
          <meta
            property="og:url"
            content={`https://locallog.now.sh/post/${post.id}`}
          />
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
            <h5>By - {post.author}</h5>
            <h6>{post.date}</h6>
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
          <h3 style={{ marginBottom: "15px" }}>Share Post</h3>
          <h6>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              data-text={post.title}
              data-show-count="true"
              className="twitter-share-button"
            >
              Tweet
            </a>
          </h6>
        </section>
        <section>
          <Related category={post.category} id={post.id} />
        </section>
        <Footer />
      </div>
      <style jsx>
        {`

       .single-post-body p, h1, h2, h3, h4{
          font-family: 'Manrope', sans-serif;
          font-size: 1.5rem
        }
          .single-post {
            margin: auto;
            width: 90%;
            margin-top: 20px;
          }

          .header-image img {
            width: 100%;
            height: auto;
          }

          .post-sub-head {
            display: flex;
            justify-content: space-between;
          }

          .single-post-title {
            margin: 10px 0;
          }

          .single-post-body {
            margin: 10px 0;
          }

          .views-count {
            margin-right: 10px;
          }

          .post-sub-head {
            padding: 10px 0;
          }

          /* TABLET SCREEN  */

          @media only screen and (min-width: 600px) {
            .views-count {
              margin-right: 40px;
            }
          }

          /* IPAD PRO | SMALL LAPTOP  */

          @media only screen and (min-width: 1000px) {
            .single-post {
              width: 70%;
            }

            .header-image img {
              height: 500px;
            }
          }

          /* 4K SCREEN  */

          @media only screen and (min-width: 2500px) {
            .single-post {
              width: 50%;
            }
          }
        `}
      </style>
    </Layout>
  );
}

export default index;
