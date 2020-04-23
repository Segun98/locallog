import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
// import { NetworkStatus } from "apollo-client";
import gql from "graphql-tag";
import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser"


export const ALL_POSTS_QUERY = gql`
  {
    posts {
      id
      title
      description
      category
      author
      date
      email
    }
  }
`;

// export const POST_QUERY = gql`
//   {
//     post(id: "5ea0bfa1b24d0d2024352703") {
//       id
//       title
//     }
//   }
// `;

function Index() {
  // const [graphpost, setgraphpost] = useState([]);
  // const [errormess, seterror] = useState({
  //   err: "error loading post",
  //   loading: "loading...",
  //   nothing: null
  // })
  // const { data: datapost } = useQuery(POST_QUERY, {
  //   //   // Setting this value to true will make the component rerender when
  //   //   // the "networkStatus" changes, so we are able to know if it is fetching
  //   //   // more data
  //     notifyOnNetworkStatusChange: true,
  //   });

  // function fetchPost(){
  //   const {post} = datapost
  //   setgraphpost(post);

  // }
  // console.log(graphpost);

  const [graphdata, setgraphdata] = useState([]);
  const { error, data, loading } = useQuery(ALL_POSTS_QUERY, {
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    const { posts } = data;
    setgraphdata(posts);
  }

  return (
    <Layout>
      <Head>
        <title>Home | Tadlace</title>
      </Head>
      <div>
        <section className="latest-posts-home">
          <div>
            {graphdata.map((dat) => (
              <ul key={dat.id}>
                <li><Link href={`/post/${dat.id}`} ><a>{dat.title}</a></Link></li>
                <li>{ReactHtmlParser(dat.description)}</li>
                <li>{dat.category}</li>
                <li>{dat.author}</li>
                <li>{dat.date}</li>
                <li>{dat.email}</li>
              </ul>
            ))}
            <br />
            <br />
          </div>

          {/* <div className="latest-head">
            <h1>Latest on Tadlace</h1>
          </div>
          <div className="latest-posts">
            <div className="latest-posts-wrap">
              <Link href="/post">
                <a>
                  <div className="main-post">
                    <img src="/images/articlefive.jpg" alt="articlefive" />
                    <div className="main-post-content">
                      <h3>Why You Should (not) Take Coffee Every Day </h3>
                      <p>
                        Coffee is a brewed drink prepared from roasted coffee
                        beans, the seeds of berries from certain Coffea species.
                        Once ripe, coffee berries are picked, processed, and
                        dried.
                      </p>
                      <h5>Mosh Adani</h5>
                      <h6>Apr 20</h6>
                    </div>
                  </div>
                </a>
              </Link>

              <div className="middle-posts">
                <div className="middle-post">
                  <img src="/images/articleone.png" alt="articleone" />
                  <div className="middle-post-content">
                    <h5>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam, officia!
                    </h5>
                    <p>Traversy Media</p>
                    <h6>Apr 17</h6>
                  </div>
                </div>
                <div className="middle-post">
                  <img src="/images/articletwo.jpg" alt="articletwo" />
                  <div className="middle-post-content">
                    <h5>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </h5>
                    <p>John Doe</p>
                    <h6>Apr 12</h6>
                  </div>
                </div>
                <div className="middle-post">
                  <img src="/images/articlethree.jpg" alt="articlethree" />
                  <div className="middle-post-content">
                    <h5>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Beatae!
                    </h5>
                    <p>Dev Ed</p>
                    <h6>Apr 9</h6>
                  </div>
                </div>
              </div>
              <div className="right-post">
                <img src="/images/articlefour.jpg" alt="articlefour" />
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Accusantium, nobis! Coffee is a brewed drink prepared from
                  roasted
                </p>
                <h5>Tommy Shelby</h5>
                <h6>Apr 15</h6>
              </div>
            </div>
          </div>
        </section>

        <section className="most-popular-section">
          <div className="most-popular-head">
            <h1>Most Popular</h1>
          </div>
          <div className="most-popular-wrap">
            <div className="most-popular">
              <div className="most-popular-content">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                  sed?
                </h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                  a minima magni dolore iste.
                </p>
                <h6>John Ruu</h6>
                <p>May 5, 2020</p>
              </div>
              <img src="/images/articlesix.jpg" alt="articlesix" />
            </div>
            <div className="most-popular">
              <div className="most-popular-content">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                  sed?
                </h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                  a minima magni dolore iste.
                </p>
                <h6>John Ruu</h6>
                <p>May 5, 2020</p>
              </div>
              <img src="/images/articleseven.jpg" alt="articlesix" />
            </div>
            <div className="most-popular">
              <div className="most-popular-content">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                  sed?
                </h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                  a minima magni dolore iste.
                </p>
                <h6>John Ruu</h6>
                <p>May 5, 2020</p>
              </div>
              <img src="/images/articlesix.jpg" alt="articlesix" />
            </div>
            <div className="most-popular">
              <div className="most-popular-content">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                  sed?
                </h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                  a minima magni dolore iste.
                </p>
                <h6>John Ruu</h6>
                <p>May 5, 2020</p>
              </div>
              <img src="/images/articleseven.jpg" alt="articlesix" />
            </div>
            <div className="most-popular">
              <div className="most-popular-content">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                  sed?
                </h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                  a minima magni dolore iste.
                </p>
                <h6>John Ruu</h6>
                <p>May 5, 2020</p>
              </div>
              <img src="/images/articlesix.jpg" alt="articlesix" />
            </div>
            <div className="most-popular">
              <div className="most-popular-content">
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                  sed?
                </h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                  a minima magni dolore iste.
                </p>
                <h6>John Ruu</h6>
                <p>May 5, 2020</p>
              </div>
              <img src="/images/articleseven.jpg" alt="articlesix" />
            </div>
          </div> */}
        </section>
      </div>
    </Layout>
  );
}

export default Index;
