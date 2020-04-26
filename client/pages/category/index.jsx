import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Head from "next/head";
import ErrorMessage from "../../components/ErrorMessage";
import CategoryList from "../../components/CategoryList";

const ALL_POSTS_QUERY = gql`
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

export default function Index() {
  const router = useRouter();
  const { query } = router;

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
      setgraphdata(posts);
    } catch (err) {
      console.log(err.message);
      setunderror(true);
    }
  }

  const capitalize = (s) => {
    try {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    } catch (err) {
      console.log(err);
    }
  };

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

  const filteredCategory = graphdata.filter(
    (categoryData) => categoryData.category === capitalize(query.category)
  );

  if (filteredCategory.length===0) {
    const message = "No Post on this category, write the first?";
    return <ErrorMessage message={message} />;
  }


  return (
    <Layout>
      <Head>
        <title>{capitalize(query.category)} | Category</title>
      </Head>
      <div className="category">
        <div className="category-header">
          <h2>Category - {capitalize(query.category)}</h2>
        </div>

        {/* <div className="category-wrap"> */}
        <div className="category-items-wrap">
        {filteredCategory.map((allPosts) => (
          <CategoryList
            key={allPosts.id}
            href={`/post/${allPosts.id}`}
            src={`${allPosts.url}`}
            alt={truncateAlt(`${allPosts.title}`)}
            title={truncateTitle(allPosts.title)}
            author={allPosts.author}
            date={allPosts.date}
          />
        ))}
        </div>

        {/* <section className="most-popular-category">
            <div className="most-popular-category-wrap">
              <h3 style={{ textAlign: "right" }}>Most Popular</h3>
              <div className="most-popular-category-item">
                <img src="/images/articlethree.jpg" alt="articlesix" />
                <div className="most-popular-category-item-content">
                  <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, sed?
                  </h5>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Esse a minima magni dolore iste.
                  </p>
                  <h6>John Ruu</h6>
                  <p>May 5, 2020</p>
                </div>
              </div>
              <div className="most-popular-category-item">
                <img src="/images/articlefour.jpg" alt="articlesix" />
                <div className="most-popular-category-item-content">
                  <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, sed?
                  </h5>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Esse a minima magni dolore iste.
                  </p>
                  <h6>John Ruu</h6>
                  <p>May 5, 2020</p>
                </div>
              </div>
              <div className="most-popular-category-item">
                <img src="/images/articlefive.jpg" alt="articlesix" />
                <div className="most-popular-category-item-content">
                  <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, sed?
                  </h5>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Esse a minima magni dolore iste.
                  </p>
                  <h6>John Ruu</h6>
                  <p>May 5, 2020</p>
                </div>
              </div>
              <div className="most-popular-category-item">
                <img src="/images/articleseven.jpg" alt="articlesix" />
                <div className="most-popular-category-item-content">
                  <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, sed?
                  </h5>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Esse a minima magni dolore iste.
                  </p>
                  <h6>John Ruu</h6>
                  <p>May 5, 2020</p>
                </div>
              </div>
            </div>
          </section> */}
      </div>
      {/* </div> */}
    </Layout>
  );
}
