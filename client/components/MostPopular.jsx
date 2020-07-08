import React, { useState, useEffect } from "react";
import Link from "next/link";
import { request } from "graphql-request";
import ErrorMessage from "./ErrorMessage";
import { truncateTitle, truncateAlt, endpoint } from "../utils/utils";
import ScrollAnimation from "react-animate-on-scroll";

export default function MostPopular() {
  useEffect(() => {
    fetchPopular();
  }, []);
  const [posts, setposts] = useState([]);

  const MOST_POPULAR = `
  {
    popular {
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
    const res = await request(endpoint, MOST_POPULAR);
    const data = await res.popular;
    setposts(data);
  }

  if (posts.length === 0) {
    const message = "Fetching Posts...";
    return <ErrorMessage message={message} />;
  }

  return (
    <div>
      <div className="most-popular-wrap">
        <div className="most-popular-head-id">
          <h2>Most Popular</h2>
        </div>
        <br />
        <div className="most-popular-wrap-id">
          {posts.map((post) => (
            <ScrollAnimation key={post.titleurl} animateIn="fadeIn">
              <div className="most-popular-item-id">
                <img
                  src={`${post.url}`}
                  loading="lazy"
                  alt={truncateAlt(`${post.title}`)}
                />
                <div className="most-popular-content-id">
                  <Link
                    href={`/post/${post.titleurl}`}
                    as={`/post/${post.titleurl}`}
                  >
                    <a>
                      <h5>{truncateTitle(post.title)}</h5>
                      <p style={{ margin: "5px 0" }}>{post.author}</p>
                      <h6>{post.date}</h6>
                    </a>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      <style jsx>
        {`
          h5,
          h2 {
            color: rgb(51, 62, 99);
          }

          p {
            font-size: 0.8rem;
          }
          .most-popular-wrap {
            margin: auto;
            width: 90%;
          }
          .most-popular-head-id {
            margin: 2px 0;
          }

          .most-popular-head-id h2 {
            margin: 2px 0;
            font-size: 1.2rem;
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
            height: 80px;
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
            .most-popular-head-id h2 {
              margin: 2px 0;
              font-size: 1.5rem;
            }
            .most-popular-wrap-id {
              gap: 50px;
              grid-template-columns: 1fr 1fr 1fr;
            }
          }

          /* 4K SCREEN  */

          @media only screen and (min-width: 2000px) {
            .most-popular-wrap-id {
              gap: 70px;
            }

            .most-popular-wrap {
              width: 60%;
            }
          }
        `}
      </style>
    </div>
  );
}
