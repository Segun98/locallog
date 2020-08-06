import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";
import { request } from "graphql-request";
import AllPosts from "../components/AllPosts";
import MostPopular from "../components/MostPopular";
import { truncateAlt, truncateTitle, endpoint } from "../utils/utils";

const LATEST_POSTS = `
  {
    latest {
      titleurl
      title
      author
      date
      url
      metaDesc
    }
  }
`;

export async function getServerSideProps() {
  const res = await request(endpoint, LATEST_POSTS);
  const posts = await res.latest;

  return {
    props: {
      posts,
    },
  };
}

function Index({ posts }) {
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
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dowrygm9b/image/upload/v1596675066/tadlog/20200517_232032_0000_xvpy87.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dowrygm9b/image/upload/v1596675066/tadlog/20200517_232032_0000_xvpy87.png"
        />
      </Head>
      <div>
        <section className="latest-posts-home">
          <div className="latest-head">
            <h1>Latest on Locallog</h1>
          </div>
          <div className="latest-posts">
            <div className="latest-posts-wrap">
              <Link
                href={`/post/${posts[0].titleurl}`}
                as={`/post/${posts[0].titleurl}`}
              >
                <a>
                  <div className="main-post">
                    <img
                      src={`${posts[0].url}`}
                      alt={truncateAlt(`${posts[0].title}`)}
                    />
                    <div className="main-post-content">
                      <h5>{truncateTitle(posts[0].title)}</h5>
                      <p>{truncateTitle(posts[0].metaDesc)}</p>
                      <p>{posts[0].author}</p>
                      <h6>{posts[0].date}</h6>
                    </div>
                  </div>
                </a>
              </Link>

              <div className="middle-posts">
                <Link
                  href={`/post/${posts[1].titleurl}`}
                  as={`/post/${posts[1].titleurl}`}
                >
                  <a>
                    <div className="middle-post">
                      <img
                        src={`${posts[1].url}`}
                        alt={truncateAlt(`${posts[1].title}`)}
                      />
                      <div className="middle-post-content">
                        <h5>{truncateTitle(posts[1].title)}</h5>
                        <p>{posts[1].author}</p>
                        <h6>{posts[1].date}</h6>
                      </div>
                    </div>
                  </a>
                </Link>
                <Link
                  href={`/post/${posts[2].titleurl}`}
                  as={`/post/${posts[2].titleurl}`}
                >
                  <a>
                    <div className="middle-post">
                      <img
                        src={`${posts[2].url}`}
                        alt={truncateAlt(`${posts[2].title}`)}
                      />
                      <div className="middle-post-content">
                        <h5>{truncateTitle(posts[2].title)}</h5>
                        <p>{posts[2].author}</p>
                        <h6>{posts[2].date}</h6>
                      </div>
                    </div>
                  </a>
                </Link>

                <Link
                  href={`/post/${posts[3].titleurl}`}
                  as={`/post/${posts[3].titleurl}`}
                >
                  <a>
                    <div className="middle-post">
                      <img
                        src={`${posts[3].url}`}
                        alt={truncateAlt(`${posts[3].title}`)}
                      />
                      <div className="middle-post-content">
                        <h5>{truncateTitle(posts[3].title)}</h5>
                        <p>{posts[3].author}</p>
                        <h6>{posts[3].date}</h6>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>

              <Link
                href={`/post/${posts[4].titleurl}`}
                as={`/post/${posts[4].titleurl}`}
              >
                <a>
                  <div className="right-post">
                    <img
                      src={`${posts[4].url}`}
                      alt={truncateAlt(`${posts[4].title}`)}
                    />
                    <h5>{truncateTitle(posts[4].title)}</h5>
                    <p>{truncateTitle(posts[4].metaDesc)}</p>
                    <p>{posts[4].author}</p>
                    <h6>{posts[4].date}</h6>
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
          h5 {
            color: rgb(51, 62, 99);
          }

          .latest-posts-home {
            margin: 1px auto;
            width: 95%;
          }

          .latest-head {
            margin: 0 auto;
            margin-bottom: 10px;
            width: 95%;
          }
          .latest-head h1 {
            color: rgb(51, 62, 99);
            font-size: 1.2rem;
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
            width: 100%;
            height: 200px;
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
            margin-left: 20px;
            line-height: 20px;
          }

          .middle-post p {
            font-size: 0.8rem;
          }

          .middle-post img {
            width: 130px;
            height: 80px;
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
              height: 250px;
            }
            .latest-head h1 {
              font-size: 1.5rem;
            }
            .right-post img {
              height: 250px;
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

          @media only screen and (min-width: 2000px) {
            .latest-posts-wrap {
              grid-template-columns: 1fr 1fr 1fr;
              gap: 50px;
              width: 60%;
            }

            .main-post img {
              width: 450px;
            }

            .right-post img {
              width: 450px;
            }

            .latest-head {
              width: 60%;
            }
          }
        `}
      </style>
    </Layout>
  );
}
export default Index;
