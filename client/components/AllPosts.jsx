import { useEffect, useState } from "react";
import { request } from "graphql-request";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";

export default function AllPosts() {
  useEffect(() => {
    fetchAll();
  }, []);
  const [posts, setposts] = useState([]);

  const ALL_POSTS = `
  {
    posts {
      id
      title
      author
      date
      url
      count
    }
  }
  `;

  async function fetchAll() {
    // const localendpoint = "http://localhost:8080/graphql";
    const prodendpoint = "https://backlog.now.sh/graphql"
    const res = await request(prodendpoint, ALL_POSTS);
    const data = await res.posts;
    setposts(data);
  }

  if (posts.length === 0) {
    const message = "Loading";
    return <ErrorMessage message={message} />;
  } else if (posts.length > 0) {
    var newfirst = posts.reverse();
  }

  //   console.log(newfirst);

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

  return (
    <div>
      <section className="all-posts-section">
        <div className="all-posts-head">
          <h1>All Posts</h1>
        </div>
        <div className="all-posts-wrap">
          {newfirst.map((allPosts) => (
            <Link key={allPosts.id} href={`/post/${allPosts.id}`}>
              <a>
                <div className="all-posts">
                  <div className="all-posts-content">
                    <h5>{truncateTitle(allPosts.title)}</h5>
                    <p style={{ margin: "5px 0" }}>{allPosts.author}</p>
                    <p>{allPosts.date}</p>
                  </div>
                  <img
                    src={`${allPosts.url}`}
                    alt={truncateAlt(`${allPosts.title}`)}
                  />
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <style jsx>
        {`
          .all-posts-section {
            margin: 20px 0;
          }

          .all-posts-head {
            margin: 10px auto;
            width: 90%;
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
              gap: 20px;
            }
          }

          /* LAPTOP  */

          @media only screen and (min-width: 1300px) {
            .all-posts-wrap {
              grid-template-columns: 1fr 1fr 1fr;
              gap: 30px;
            }

            .all-posts img {
              width: 200px;
              height: 150px;
            }
          }

          /* 4K SCREEN  */

          @media only screen and (min-width: 2500px) {
            .all-posts-head {
              width: 70%;
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
