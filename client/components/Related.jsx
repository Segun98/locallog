import React, { useState, useEffect } from "react";
import Link from "next/link";
import { request } from "graphql-request";
import ErrorMessage from "./ErrorMessage";

export default function Related({ category, id }) {
  useEffect(() => {
    fetchRelated();
  }, []);
  const [posts, setposts] = useState([]);

  const Related = `
      {
        posts {
          id
          title
          author
          date
          url
          category
        }
      }
      `;

  async function fetchRelated() {
    const localendpoint = "http://localhost:8080/graphql";
    // const prodendpoint = "https://backlog.now.sh/graphql"
    const res = await request(localendpoint, Related);
    const data = await res.posts;
    setposts(data);
  }

  if (posts.length === 0) {
    const message = "Loading";
    return <ErrorMessage message={message} />;
  } else if (posts.length > 0) {
    const filt = posts.filter((post) => post.id !== id);
    var related = filt.filter((post) => post.category === category);
    // var firstItem = posts[posts.length - 1];
    // var secondItem = posts[posts.length - 2];
    // var thirdItem = posts[posts.length - 3];
    // var fourthItem = posts[posts.length - 4];
    // var fifthItem = posts[posts.length - 5];
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
      <div className="related-head">
        <h2>Related</h2>
      </div>
      <br />
      <section className="related-section">
        {related.map((relatedpost, index) => (
          <div className="related-wrap" key={index}>
            <div className="related-item">
              <img
                src={`${relatedpost.url}`}
                alt={truncateAlt(`${relatedpost.title}`)}
              />
              <div className="related-content">
                <Link href={`/post/${relatedpost.id}`}>
                  <a>
                    <h4>{truncateTitle(relatedpost.title)}</h4>
                    <p>{relatedpost.author}</p>
                    <h5>{relatedpost.date}</h5>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
      <style jsx>{`
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
          margin: auto;
          width: 90%;
          margin-bottom: 5px;
        }
        .related-item {
          display: flex;
        }
        .related-content {
          margin-left: 20px;
        }

        .related-item img {
          width: 100px;
          height: 100px;
        }
        @media only screen and (min-width: 600px) {
          .related-section {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
