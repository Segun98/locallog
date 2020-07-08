import { useEffect, useState } from "react";
import { request } from "graphql-request";
import Link from "next/link";
import { truncateAlt, truncateTitle, endpoint } from "../utils/utils";
import ScrollAnimation from "react-animate-on-scroll";

export default function AllPosts() {
  useEffect(() => {
    fetchAll();
  }, []);
  const [posts, setposts] = useState([]);

  const ALL_POSTS = `
  {
    posts {
      id
      titleurl
      title
      author
      date
      url
    }
  }
  `;

  async function fetchAll() {
    const res = await request(endpoint, ALL_POSTS);
    const data = await res.posts;
    setposts(data);
  }

  return (
    <div>
      <section className="all-posts-section">
        <div className="all-posts-head">
          <h2>All Posts</h2>
        </div>
        <div className="all-posts-wrap">
          {posts.map((allPosts) => (
            <ScrollAnimation animateIn="fadeIn" key={allPosts.id}>
              <Link
                href={`/post/${allPosts.titleurl}`}
                as={`/post/${allPosts.titleurl}`}
              >
                <a>
                  <div className="all-posts">
                    <div className="all-posts-content">
                      <h5>{truncateTitle(allPosts.title)}</h5>
                      <p style={{ margin: "5px 0" }}>{allPosts.author}</p>
                      <p>{allPosts.date}</p>
                    </div>
                    <img
                      src={`${allPosts.url}`}
                      loading="lazy"
                      alt={truncateAlt(`${allPosts.title}`)}
                    />
                  </div>
                </a>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      <style jsx>
        {`
          h5,
          h2 {
            color: rgb(51, 62, 99);
          }
          .all-posts-section {
            margin: 20px 0;
          }

          .all-posts-head {
            margin: 10px auto;
            width: 90%;
          }

          .all-posts-head h2 {
            font-size: 1.2rem;
          }

          .all-posts-wrap {
            display: grid;
            display: -moz-grid;
            display: -ms-grid;
            grid-template-columns: 1fr;
            margin: auto;
            width: 90%;
            gap: 10px;
          }

          .all-posts {
            display: flex;
            justify-content: space-between;
          }

          .all-posts p {
            font-size: 0.8rem;
          }

          .all-posts-content {
            line-height: 20px;
            margin-right: 20px;
          }

          .all-posts img {
            width: 100px;
            height: 100px;
          }

          /* TABLET SCREEN  */

          @media only screen and (min-width: 600px) {
            .all-posts-wrap {
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .all-posts-head h1 {
              font-size: 1.5rem;
            }

            .all-posts-head {
              margin: 15px auto;
            }
          }

          /* IPAD PRO | SMALL LAPTOP  */

          @media only screen and (min-width: 1000px) {
            .all-posts-wrap {
              gap: 80px;
            }
            .all-posts-head h2 {
              font-size: 1.5rem;
            }
          }

          /* LAPTOP  */

          @media only screen and (min-width: 1300px) {
            .all-posts-wrap {
              grid-template-columns: 1fr 1fr 1fr;
              gap: 30px;
            }
          }

          /* 4K SCREEN  */

          @media only screen and (min-width: 2000px) {
            .all-posts-head {
              width: 65%;
            }

            .all-posts-wrap {
              width: 65%;
            }
          }
        `}
      </style>
    </div>
  );
}
