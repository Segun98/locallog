import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";
import { request } from "graphql-request";
import AllPosts from "../components/AllPosts";
import MostPopular from "../components/MostPopular";
import {truncateAlt, truncateTitle} from "../utils/truncate"

const ALL_POSTS_QUERY = `
  {
    posts {
      titleurl
      title
      author
      date
      url
    }
  }
`;

export async function getStaticProps() {
  const localendpoint = "http://localhost:8080/graphql";
  // const prodendpoint = "https://backlog.now.sh/graphql"
  const res = await request(localendpoint, ALL_POSTS_QUERY);
  const posts = await res.posts;

  return {
    props: {
      posts,
    },
  };
}

function Index({ posts }) {
  //LATEST POSTS
  var firstItem = posts[posts.length - 1];
  var secondItem = posts[posts.length - 2];
  var thirdItem = posts[posts.length - 3];
  var fourthItem = posts[posts.length - 4];
  var fifthItem = posts[posts.length - 5];


  return (
    <Layout>
      <Head>
        <title>Home | Locallog</title>
        <meta
          name="Description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="keywords" content="Publishing, Platform , Locallog" />
        <meta name="author" content="Segun Olanitori" />
        <meta
          property="og:description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="twitter:title" content="Locallog" />
        <meta
          name="twitter:description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Locallog" />
        <meta property="og:site_name" content="Locallog" />
        <meta property="article:publisher" content="Segun Olanitori" />
        <meta property="article:author" content="Segun Olanitori" />
      </Head>
      <div>
        <section className="latest-posts-home">
          <div className="latest-head">
            <h1>Latest on Locallog</h1>
          </div>
          <div className="latest-posts">
            <div className="latest-posts-wrap">
              <Link href={`/post/${firstItem.titleurl}`}>
                <a>
                  <div className="main-post">
                    <img
                      src={`${firstItem.url}`}
                      alt={truncateAlt(`${firstItem.title}`)}
                    />
                    <div className="main-post-content">
                      <h5>{truncateTitle(firstItem.title)}</h5>
                      <p>{firstItem.author}</p>
                      <h6>{firstItem.date}</h6>
                    </div>
                  </div>
                </a>
              </Link>

              <div className="middle-posts">
                <Link href={`/post/${secondItem.titleurl}`}>
                  <a>
                    <div className="middle-post">
                      <img
                        src={`${secondItem.url}`}
                        alt={truncateAlt(`${secondItem.title}`)}
                      />
                      <div className="middle-post-content">
                        <h5>{truncateTitle(secondItem.title)}</h5>
                        <p>{secondItem.author}</p>
                        <h6>{secondItem.date}</h6>
                      </div>
                    </div>
                  </a>
                </Link>
                <Link href={`/post/${thirdItem.titleurl}`}>
                  <a>
                    <div className="middle-post">
                      <img
                        src={`${thirdItem.url}`}
                        alt={truncateAlt(`${thirdItem.title}`)}
                      />
                      <div className="middle-post-content">
                        <h5>{truncateTitle(thirdItem.title)}</h5>
                        <p>{thirdItem.author}</p>
                        <h6>{thirdItem.date}</h6>
                      </div>
                    </div>
                  </a>
                </Link>

                <Link href={`/post/${fourthItem.titleurl}`}>
                  <a>
                    <div className="middle-post">
                      <img
                        src={`${fourthItem.url}`}
                        alt={truncateAlt(`${fourthItem.title}`)}
                      />
                      <div className="middle-post-content">
                        <h5>{truncateTitle(fourthItem.title)}</h5>
                        <p>{fourthItem.author}</p>
                        <h6>{fourthItem.date}</h6>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>

              <Link href={`/post/${fifthItem.titleurl}`}>
                <a>
                  <div className="right-post">
                    <img
                      src={`${fifthItem.url}`}
                      alt={truncateAlt(`${fifthItem.title}`)}
                    />
                    <h5>{truncateTitle(fifthItem.title)}</h5>
                    <p>{fifthItem.author}</p>
                    <h6>{fifthItem.date}</h6>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <MostPopular />
        </section>

        <section>
          <AllPosts />
        </section>
      </div>
      <style jsx>
        {`
          /* INDEX PAGE  */

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: rgb(41, 41, 41);
          }

          .latest-posts-home {
            margin: 5px auto;
            width: 95%;
          }

          .latest-head {
            margin: 0 auto;
            margin-bottom: 10px;
            width: 95%;
          }

          .latest-posts-wrap {
            display: grid;
            display: -moz-grid;
            display: -ms-grid;
            grid-template-columns: 1fr;
            margin: auto;
            width: 95%;
            gap: 20px;
          }

          .main-post img {
            /* width: 350px; */
            width: 100%;
            height: 300px;
          }

          .main-post-content {
            line-height: 25px;
            margin-top: 5px;
          }

          .main-post-content p {
            font-size: 0.9rem;
          }

          .middle-posts {
            display: grid;
            display: -moz-grid;
            display: -ms-grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .middle-post {
            display: flex;
          }

          .middle-post-content {
            margin-left: 10px;
            line-height: 20px;
          }

          .middle-post p {
            font-size: 0.8rem;
          }

          .middle-post img {
            width: 150px;
            height: 100px;
          }

          .right-post img {
            width: 320px;
            height: 300px;
          }

          .right-post {
            line-height: 25px;
            display: none;
          }

          .right-post p {
            font-size: 0.9rem;
          }

          /* TABLET SCREEN  */

          @media only screen and (min-width: 600px) {
            .latest-posts-wrap {
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
          }

          /* IPAD PRO | SMALL LAPTOP  */

          @media only screen and (min-width: 1000px) {
            .main-post img {
              width: 400px;
            }
          }

          /* LAPTOP  */

          @media only screen and (min-width: 1300px) {
            .latest-posts-wrap {
              grid-template-columns: 1fr 1fr 1fr;
              gap: 30px;
            }

            .right-post {
              display: block;
            }

            .right-post img {
              width: 400px;
            }
          }

          @media only screen and (min-width: 2500px) {
            .latest-posts-wrap {
              grid-template-columns: 1fr 1fr 1fr;
              gap: 50px;
              width: 70%;
            }

            .main-post img {
              width: 450px;
            }

            .right-post img {
              width: 450px;
            }

            .latest-head {
              width: 70%;
            }
          }
        `}
      </style>
    </Layout>
  );
}
export default Index;
