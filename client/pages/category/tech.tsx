import Layout from "../../components/Layout";
import Head from "next/head";

export default function Tech() {
  return (
    <Layout>
      <Head>
        <title>Tech | Tadlace</title>
      </Head>
      <div className="category">
        <div className="category-header">
          <h2>Technology</h2>
        </div>

        <div className="category-wrap">
          <div className="category-items-wrap">
            <div className="category-item">
              <img src="/images/articleone.png" alt="articleone" />
              <div className="category-item-content">
                <h4>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aperiam, mollitia.
                </h4>
                <p>John Doe</p>
                <h6>Apr 19</h6>
              </div>
            </div>
            <div className="category-item">
              <img src="/images/articletwo.jpg" alt="articletwo" />
              <div className="category-item-content">
                <h4>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h4>
                <p>Pique Ramos</p>
                <h6>Apr 21</h6>
              </div>
            </div>
            <div className="category-item">
              <img src="/images/articlethree.jpg" alt="articlethree" />
              <div className="category-item-content">
                <h4>Lorem ipsum dolor sit amet.</h4>
                <p>Larin wang</p>
                <h6>Apr 28</h6>
              </div>
            </div>
            <div className="category-item">
              <img src="/images/articlefour.jpg" alt="articlefour" />
              <div className="category-item-content">
                <h4>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aperiam, mollitia.
                </h4>
                <p>Lionel Messi</p>
                <h6>May 19</h6>
              </div>
            </div>
            <div className="category-item">
              <img src="/images/articlefive.jpg" alt="articleone" />
              <div className="category-item-content">
                <h4>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aperiam, mollitia.
                </h4>
                <p>John Doe</p>
                <h6>Apr 19</h6>
              </div>
            </div>
            <div className="category-item">
              <img src="/images/articlesix.jpg" alt="articleone" />
              <div className="category-item-content">
                <h4>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aperiam, mollitia.
                </h4>
                <p>John Doe</p>
                <h6>Apr 19</h6>
              </div>
            </div>
            <div className="category-item">
              <img src="/images/articleseven.jpg" alt="articleone" />
              <div className="category-item-content">
                <h4>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aperiam, mollitia.
                </h4>
                <p>John Doe</p>
                <h6>Apr 19</h6>
              </div>
            </div>
          </div>

          <section className="most-popular-category">
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
          </section>
        </div>
      </div>
    </Layout>
  );
}
