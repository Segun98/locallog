import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>Home | Tadlace</title>
      </Head>
      <div>
        <section className="latest-posts-home">
          <div className="latest-head">
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
                      <h6>April 20</h6>
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
                    <h6>April 17</h6>
                  </div>
                </div>
                <div className="middle-post">
                  <img src="/images/articletwo.jpg" alt="articletwo" />
                  <div className="middle-post-content">
                    <h5>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </h5>
                    <p>John Doe</p>
                    <h6>April 12</h6>
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
                    <h6>April 9</h6>
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
                <h5>Segun OS</h5>
                <h6>April 15</h6>
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
          </div>
        </section>
        <style jsx>
          {`
            // img {
            //   width: 90%;
            // }
            // p {
            //   white-space: nowrap;
            //   overflow: hidden;
            //   text-overflow: ellipsis;
            // }
          `}
        </style>
      </div>
    </Layout>
  );
}
