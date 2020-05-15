import Layout from "../../components/Layout";
import Head from "next/head";
import { request } from "graphql-request";
import { truncateTitle, truncateAlt, endpoint } from "../../utils/utils";

const SEARCH_QUERY = `
  query search($author: String!, $title: String!) {
      search(author: $author, title: $title) {
        id
        titleurl
        title
        author
        date
      }
    }
`;


export async function getServerSideProps({query}) { 
   const variables = {
    author: `${query.author === undefined? query.title : query.author }`,
    title: `${query.title === undefined? query.author : query.title }`
  };
  
  const res = await request(endpoint, SEARCH_QUERY, variables);
  const posts = await res.search;

  return {
    props: {
      posts
    },
  };
}

export default function Index({posts}) {
const error = "No results found..."
  const capitalize = (s) => {
    try {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Head>
        <title> Search Locallog </title>
      </Head>
      <div style={{textAlign:"center", marginTop: posts.length ===0 ?"50px": "1px"}}>
      {posts.length === 0? error : null}
      </div>
      <div>
          {posts.map(post => (
            <div key={post.id}>
            <ul>
            <li>{post.title}</li>
            </ul>
            <ul>
            <li>{post.author}</li>
            </ul>
            </div>
          ))}
      </div>
    </Layout>
  );
}
