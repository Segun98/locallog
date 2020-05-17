import Layout from "../../components/Layout";
import Head from "next/head";
import { request } from "graphql-request";
import { truncateTitle, truncateAlt, endpoint } from "../../utils/utils";
import Link from "next/link";
import Footer from "../../components/Footer"

const SEARCH_QUERY = `
  query search($author: String!, $title: String!) {
      search(author: $author, title: $title) {
        titleurl
        title
        author
        date
        url
      }
    }
`;

export async function getServerSideProps({ query }) {
  const variables = {
    author: `${query.author === undefined ? query.title : query.author}`,
    title: `${query.title === undefined ? query.author : query.title}`,
  };

  const res = await request(endpoint, SEARCH_QUERY, variables);
  const posts = await res.search;

  return {
    props: {
      posts,
    },
  };
}

export default function Index({ posts }) {  
  posts.reverse();
  const error = "No results found...";
 
  return (
    <Layout>
      <Head>
        <title> Search Locallog </title>
      </Head>
      <div
        style={{
          textAlign: "center",
          marginTop: posts.length === 0 ? "50px" : "1px",
        }}
      >
        {posts.length === 0 ? error : null}
      </div>

      <div className="category"> 
        <div className="category-items-wrap">
          {posts.map((post, index) => (
            <div key={index}>
              <Link href={`/post/${post.titleurl}`}>
                <a>
                  <div className="category-item">
                    <img src={post.url} alt={truncateAlt(post.title)} />
                    <div className="category-item-content">
                      <h5>{truncateTitle(post.title)}</h5>
                      <p style={{ margin: "5px 0" }}>{post.author}</p>
                      <h6>{post.date}</h6>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: posts.length < 3 ? "150px" : "10px",
          }}
        >
        <Footer />
        </div>
          <style jsx>{`
          .category{
            margin-top: 10px
          }
          `}</style>
      </div>
    </Layout>
  );
}
