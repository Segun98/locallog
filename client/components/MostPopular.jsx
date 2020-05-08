import React, { useState, useEffect } from "react";
import Link from "next/link";
import { request } from "graphql-request";
import ErrorMessage from "./ErrorMessage";

export default function MostPopular() {
  useEffect(() => {
    fetchPopular();
  }, []);
  const [posts, setposts] = useState([]);

  const MOST_POPULAR = `
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

  async function fetchPopular() {
    const res = await request("https://backlog.now.sh/graphql", MOST_POPULAR);
    const data = await res.posts;
    setposts(data);
  }

  if (posts.length === 0) {
    const message = "Loading";
    return <ErrorMessage message={message} />;
  } else if (posts.length > 0) {
    var sorted = posts.sort((a, b) => b.count - a.count);
  }

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
      <div className="most-popular-wrap">
        <div className="most-popular-head-id">
          <h2>Most Popular</h2>
        </div>
        <br />
        <div className="most-popular-wrap-id">
          <div className="most-popular-item-id">
            <img
              src={`${sorted[0].url}`}
              alt={truncateAlt(`${sorted[0].title}`)}
            />
            <div className="most-popular-content-id">
              <Link href={`/post/${sorted[0].id}`}>
                <a>
                  <h4>{truncateTitle(sorted[0].title)}</h4>
                  <p>{sorted[0].author}</p>
                  <h5>{sorted[0].date}</h5>
                </a>
              </Link>
            </div>
          </div>
          <div className="most-popular-item-id">
            <img
              src={`${sorted[1].url}`}
              alt={truncateAlt(`${sorted[1].title}`)}
            />
            <div className="most-popular-content-id">
              <Link href={`/post/${sorted[1].id}`}>
                <a>
                  <h4>{truncateTitle(sorted[1].title)}</h4>
                  <p>{sorted[1].author}</p>
                  <h5>{sorted[1].date}</h5>
                </a>
              </Link>
            </div>
          </div>
          <div className="most-popular-item-id">
            <img
              src={`${sorted[2].url}`}
              alt={truncateAlt(`${sorted[2].title}`)}
            />
            <div className="most-popular-content-id">
              <Link href={`/post/${sorted[2].id}`}>
                <a>
                  <h4>{truncateTitle(sorted[2].title)}</h4>
                  <p>{sorted[2].author}</p>
                  <h5>{sorted[2].date}</h5>
                </a>
              </Link>
            </div>
          </div>
          <div className="most-popular-item-id">
            <img
              src={`${sorted[3].url}`}
              alt={truncateAlt(`${sorted[3].title}`)}
            />
            <div className="most-popular-content-id">
              <Link href={`/post/${sorted[3].id}`}>
                <a>
                  <h4>{truncateTitle(sorted[3].title)}</h4>
                  <p>{sorted[3].author}</p>
                  <h5>{sorted[3].date}</h5>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .most-popular-wrap {
            margin: auto;
            width: 90%;
          }
          .most-popular-head-id {
            margin: 10px 0;
          }

          .most-popular-wrap-id {
            display: grid;
            display: -moz-grid;
            display: -ms-grid;
            grid-template-columns: 1fr;
            gap: 10px;
            margin-bottom: 10px;
          }

          .most-popular-item-id {
            display: flex;
          }

          .most-popular-item-id img {
            width: 100px;
            height: 100px;
          }

          .most-popular-content-id {
            margin-left: 20px;
          }

          /* TABLET SCREEN  */

          @media only screen and (min-width: 600px) {
            .most-popular-wrap-id {
              grid-template-columns: 1fr 1fr;
            }
          }

          /* 4K SCREEN  */

          @media only screen and (min-width: 2500px) {
            .most-popular-wrap-id {
              column-gap: 100px;
            }

            .most-popular-wrap {
              width: 65%;
            }
          }
        `}
      </style>
    </div>
  );
}
