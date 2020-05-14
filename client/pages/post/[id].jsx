import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import ReactHtmlParser from "react-html-parser";
import Footer from "../../components/Footer";
import { request } from "graphql-request";
import Related from "../../components/Related";
import {
  FacebookIcon
} from "react-share";
import {truncateAlt, endpoint} from '../../utils/utils'
import Comments from '../../components/Comments'

const POSTS_QUERY = `
query post($titleurl: String!) {
      post(titleurl: $titleurl) {
        id
        titleurl
        title
        description
        count
        url
        author
        date
        category
        metaDesc
        authorProfile
      }
    }
`;

export async function getServerSideProps({ params }) {
  const variables = {
    titleurl: params.id,
  };

  const res = await request(endpoint, POSTS_QUERY, variables);
  const post = await res.post;
  return {
    props: {
      post,
    },
  };
}

function index({ post }) {
  return (
    <Layout>
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{post.title} | Tadlace</title>
          <meta name="Description" content={post.metaDesc} />
          <meta name="keywords" content={post.title} />
          <meta name="author" content={post.author} />
          <meta property="og:description" content={post.metaDesc} />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.metaDesc} />
          <meta name="twitter:image" content={post.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`https://locallog.now.sh/post/${post.titleurl}`}
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
          <script
            async
            defer
            crossorigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0"
          ></script>
        </Head>
      </div>
      <div className="single-post">
        <div className="header-image">
          <img src={`${post.url}`} alt={truncateAlt(`${post.title}`)} />
        </div>
        <div className="post-title-wrap">
          <h3 className="single-post-title">{post.title}</h3>
        </div>
        <hr />
        <div className="post-sub-head">
          <div>
            <h4>By - {post.author}</h4>
            <h5>{post.date}</h5>
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
          <h3 style={{ marginBottom: "10px" }}>Share Post</h3>
          <div className="social-icons">
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
          <h6>
            <div
              className="fb-share-button"
              data-href="https://developers.facebook.com/docs/plugins/"
              data-layout="button"
              data-size="large"
            >
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=https://locallog.now.sh/post/${post.titleurl}`}
                className="fb-xfbml-parse-ignore"
              >
              <FacebookIcon size={32} />
              </a>
            </div>
          </h6>
          </div>
        </section>
        <section>
          <Comments id={post.titleurl} />
        </section>
        <section>
          <Related category={post.category} id={post.id} />
        </section>
        <Footer />
      </div>
      <style jsx>
        {`
          .single-post-body p,
          h1,
          h2,
          h3,
          h4 {
            font-family: "Manrope", sans-serif;
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
          .post-title-wrap {
            margin: auto;
            width: 80%;
          }
          .single-post-title {
            margin: 15px 0;
            text-align: center;
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

          .social-icons{
            display:flex;
            align-items:center
          }

          .social-icons h6{
            margin-left:10px
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
