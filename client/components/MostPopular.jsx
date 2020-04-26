import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import ErrorMessage from "../components/ErrorMessage";

const ALL_POSTS_QUERY = gql`
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

export default function MostPopular() {
  //data state
  const [Popular, setmostPopular] = useState([]);
  const [underror, setunderror] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  //Graphql query
  const { error, data, loading } = useQuery(ALL_POSTS_QUERY, {
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  //checks to be sure the data is fully loaded
  if (loading) {
    const message = "Loading...";
    return <ErrorMessage message={message} />;
  }
  if (error) {
    const message =
      "Error fetching Data, refresh the page or check your internet connection";
    return <ErrorMessage message={message} />;
  }

  if (underror) {
    const message =
      "Error fetching Data, refresh the page or check your internet connection";
    return <ErrorMessage message={message} />;
  }

  function fetchPosts() {
    try {
      const { posts } = data;
      setmostPopular(posts);
    } catch (err) {
      console.log(err.message);
      setunderror(true);
    }
  }
  //Last check for data
  if (Popular.length === 0) {
    return null;
  } else if (data) {
    //To get latest posts
    var sorted = Popular.sort((a, b) => b.count - a.count);
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
      <div className="most-popular">
        <div className="most-popular-head">
          <h2>Most Popular</h2>
        </div>
        <div className="most-popular-wrap">
          <div className="most-popular-item">
            <img
              src={`${sorted[0].url}`}
              alt={truncateAlt(`${sorted[0].title}`)}
            />
            <div className="most-popular-content">
            <Link href={`/post/${sorted[0].id}`}>
            <a>
              <h4>{truncateTitle(sorted[0].title)}</h4>
              <p>{sorted[0].author}</p>
              <h5>{sorted[0].date}</h5>
            </a>
            </Link>
            </div>
          </div>
          <div className="most-popular-item">
            <img
              src={`${sorted[1].url}`}
              alt={truncateAlt(`${sorted[1].title}`)}
            />
            <div className="most-popular-content">
            <Link href={`/post/${sorted[1].id}`}>
            <a>
              <h4>{truncateTitle(sorted[1].title)}</h4>
              <p>{sorted[1].author}</p>
              <h5>{sorted[1].date}</h5>
            </a>
            </Link>
            </div>
          </div>
          <div className="most-popular-item">
            <img
              src={`${sorted[2].url}`}
              alt={truncateAlt(`${sorted[2].title}`)}
            />
            <div className="most-popular-content">
            <Link href={`/post/${sorted[2].id}`}>
            <a>
              <h4>{truncateTitle(sorted[2].title)}</h4>
              <p>{sorted[2].author}</p>
              <h5>{sorted[2].date}</h5>
            </a>
            </Link>
            </div>
          </div>
          <div className="most-popular-item">
            <img
              src={`${sorted[3].url}`}
              alt={truncateAlt(`${sorted[3].title}`)}
            />
            <div className="most-popular-content">
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
    </div>
  );
}
