import React, { useState, useEffect } from "react";
import Link from "next/link";
import { request } from "graphql-request";
import ErrorMessage from "./ErrorMessage";
import { truncateTitle, truncateAlt } from "../utils/truncate";

export default function MostPopular() {
  useEffect(() => {
    fetchPopular();
  }, []);
  const [posts, setposts] = useState([]);

  const MOST_POPULAR = `
  {
    posts {
      titleurl
      title
      author
      date
      url
      count
    }
  }
  `;

  async function fetchPopular() {
    const localendpoint = "http://localhost:8080/graphql";
    // const prodendpoint = "https://backlog.now.sh/graphql"
    const res = await request(localendpoint, MOST_POPULAR);
    const data = await res.posts;
    setposts(data);
  }

  if (posts.length === 0) {
    const message = "Fetching Most Popular Posts..."
    return <ErrorMessage message={message} />;
  } else if (posts.length > 0) {
    var sorted = posts.sort((a, b) => b.count - a.count);
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
              <Link href={`/post/${sorted[0].titleurl}`}>
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
              <Link href={`/post/${sorted[1].titleurl}`}>
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
              <Link href={`/post/${sorted[2].titleurl}`}>
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
              <Link href={`/post/${sorted[3].titleurl}`}>
                <a>
                  <h4>{truncateTitle(sorted[3].title)}</h4>
                  <p>{sorted[3].author}</p>
                  <h5>{sorted[3].date}</h5>
                </a>
              </Link>
            </div>
          </div>
          <div className="most-popular-item-id">
            <img
              src={`${sorted[4].url}`}
              alt={truncateAlt(`${sorted[4].title}`)}
            />
            <div className="most-popular-content-id">
              <Link href={`/post/${sorted[4].titleurl}`}>
                <a>
                  <h4>{truncateTitle(sorted[4].title)}</h4>
                  <p>{sorted[4].author}</p>
                  <h5>{sorted[4].date}</h5>
                </a>
              </Link>
            </div>
          </div>
          <div className="most-popular-item-id">
            <img
              src={`${sorted[5].url}`}
              alt={truncateAlt(`${sorted[5].title}`)}
            />
            <div className="most-popular-content-id">
              <Link href={`/post/${sorted[5].titleurl}`}>
                <a>
                  <h4>{truncateTitle(sorted[5].title)}</h4>
                  <p>{sorted[5].author}</p>
                  <h5>{sorted[5].date}</h5>
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

          @media only screen and (min-width: 1300px) {
            .most-popular-wrap-id {
              gap: 50px;
              grid-template-columns: 1fr 1fr 1fr;
            }
          }

          /* 4K SCREEN  */

          @media only screen and (min-width: 2500px) {
            .most-popular-wrap-id {
              gap: 70px;
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
