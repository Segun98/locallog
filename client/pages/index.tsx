import Layout from "../components/Layout";
import Head from "next/head";

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>Home | Tadlace</title>
      </Head>
      <div>
        <section className="latest-posts-home">
          <div className="latest-head">
            <h2>Latest on Tadlace</h2>
          </div>
          <div className="latest-posts">
            <div className="latest-posts-wrap">
              <div className="main-post">
                <img src="/images/articlefive.jpg" alt="articlefive" />
                <div className="main-post-content">
                  <h3>Why You Should (not) Take Coffee Every Day </h3>
                  <p>
                    DescriptionCoffee is a brewed drink prepared from roasted
                    coffee beans, the seeds of berries from certain Coffea
                    species. Once ripe, coffee berries are picked, processed,
                    and dried. Dried coffee seeds are roasted to varying
                    degrees, depending on the desired flavor.
                  </p>
                </div>
              </div>
              <div className="other-posts"></div>
              <div className="other-post"></div>
            </div>
          </div>
        </section>
        <style jsx>{`
        img{
          width:500px
        }
        p{
          width:700px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        
        
        
        
        `}
        </style>
      </div>
    </Layout>
  );
}
