import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../components/Layout";
import Head from "next/head";
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

function Index() {
  //data state
  const [graphdata, setgraphdata] = useState([]);

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

  //data state
  const [Popular, setmostPopular] = useState([]);

  const [allPosts, setallPosts] = useState([])

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
      if (data) {
        const { posts } = data;
        setgraphdata(posts);
        setmostPopular(posts);
        setallPosts(posts) 
      }
    } catch (err) {
      console.log(err.message);
      setunderror(true);
    }
  }

  //Last check for data
  if (graphdata.length === 0) {
    return null;
  } else if (data) {
    //To get latest posts
    var firstItem = graphdata[graphdata.length - 1];
    var secondItem = graphdata[graphdata.length - 2];
    var thirdItem = graphdata[graphdata.length - 3];
    var fourthItem = graphdata[graphdata.length - 4];
    var fifthItem = graphdata[graphdata.length - 5];

    //Render new posts first
    var newfirst = allPosts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    //Most Popular
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
    <Layout>
      <Head>
        <title>Home | Tadlace</title>
        <meta name="Description" content=" Tadlace is an online publishing platform built for people to express
            themselves" />
          <meta name="keywords" content="Publishing, Platform , Tadlace" />
          <meta name="author" content="Segun Olanitori" />
          <meta property="og:description" content=" Tadlace is an online publishing platform built for people to express
            themselves" />
          <meta name="twitter:title" content="Tadlace" />
          <meta name="twitter:description" content=" Tadlace is an online publishing platform built for people to express
            themselves" />
          <meta name="twitter:card" content="summary" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Tadlace" />
          <meta property="og:site_name" content="Tadlace" />
          <meta property="article:publisher" content="Segun Olanitori" />
          <meta property="article:author" content="Segun Olanitori" />
      </Head>
      <div>
        <section className="latest-posts-home">
          <div className="latest-head">
            <h1>Latest on Tadlace</h1>
          </div>
          <div className="latest-posts">
            <div className="latest-posts-wrap">
              <Link href={`/post/${firstItem.id}`}>
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
                <Link href={`/post/${secondItem.id}`}>
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
                <Link href={`/post/${thirdItem.id}`}>
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

                <Link href={`/post/${fourthItem.id}`}>
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

              <Link href={`/post/${fifthItem.id}`}>
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
        <div>
          <div style={{margin:"auto", width:"90%"}}>
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
        </div>
        <section className="most-popular-section">
          <div className="most-popular-head">
            <h1>All Posts</h1>
          </div>
          <div className="most-popular-wrap">
            {newfirst.map((allPosts) => (
              <Link key={allPosts.id} href={`/post/${allPosts.id}`}>
                <a>
                  <div className="most-popular">
                    <div className="most-popular-content">
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
      </div>
    </Layout>
  );
}

export default Index;
