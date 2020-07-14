import React, { useState, useEffect } from "react";
import Link from "next/link";
import { request } from "graphql-request";
import { truncateAlt, truncateSearch, endpoint } from "../utils/utils";

export default function Related({ category, id }) {
  useEffect(() => {
    fetchRelated();
  }, []);
  const [posts, setposts] = useState([]);

  const Related = `
      {
        posts {
          id
          titleurl
          title
          author
          date
          url
          category
        }
      }
      `;

  async function fetchRelated() {
    const res = await request(endpoint, Related);
    const data = await res.posts;
    setposts(data);
  }

  if (posts.length === 0) {
    return null;
  } else if (posts.length > 0) {
    const filt = posts.filter((post) => post.id !== id); // prevents the same post from appearing
    var related = filt.filter((post) => post.category === category);
    // var firstItem = posts[posts.length - 1];
    // var secondItem = posts[posts.length - 2];
    // var thirdItem = posts[posts.length - 3];
    // var fourthItem = posts[posts.length - 4];
    // var fifthItem = posts[posts.length - 5];
  }

  return (
    <div>
      <div className="related-head">
        <h3
          style={{
            display: related.length === 0 ? "none" : "block",
            margin: "5px 0",
          }}
        >
          <hr />
          Related
        </h3>
      </div>
      <section className="related-section">
        {related.map((relatedpost, index) => (
          <div className="related-wrap" key={index}>
            <img
              src={`${relatedpost.url}`}
              loading="lazy"
              alt={truncateAlt(`${relatedpost.title}`)}
            />
            <div className="related-content">
              <Link
                href={`/post/${relatedpost.titleurl}`}
                as={`/post/${relatedpost.titleurl}`}
              >
                <a>
                  <h5>{truncateSearch(relatedpost.title)}</h5>
                  <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                    {relatedpost.author}
                  </p>
                  <h6>{relatedpost.date}</h6>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </section>
      <style jsx>{`
        h5,
        h3,
        h6 {
          color: rgb(51, 62, 99);
        }
        .related-section {
          display: grid;
          display: -moz-grid;
          display: -ms-grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        .related-wrap {
          display: flex;
        }
        .related-content {
          margin-left: 20px;
        }

        .related-wrap img {
          width: 100px;
          height: 80px;
        }
        @media only screen and (min-width: 600px) {
          .related-section {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            place-items: center;
          }
        }
      `}</style>
    </div>
  );
}
