import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Head from "next/head";
import CategoryList from "../../components/CategoryList";
import { request } from "graphql-request";
import { truncateTitle, truncateAlt, endpoint } from "../../utils/utils";
import Footer from "../../components/Footer";

const ALL_POSTS_QUERY = `
  {
    posts {
      id
      titleurl
      title
      author
      date
      url
      category
    }
  }
`;

export async function getServerSideProps() {
  const res = await request(endpoint, ALL_POSTS_QUERY);
  const posts = await res.posts;

  return {
    props: {
      posts,
    },
  };
}

export default function Index({ posts }) {
  const router = useRouter();

  const { query } = router;

  const capitalize = (s) => {
    try {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredCategory = posts.filter(
    (post) => post.category === capitalize(query.category)
  );

  return (
    <Layout>
      <Head>
        <title> {capitalize(query.category)} | Category</title>
      </Head>
      <div className="category">
        <div className="category-header">
          <h4>Category - {capitalize(query.category)}</h4>
        </div>
        <div
          style={{
            textAlign: "center",
            display: filteredCategory.length === 0 ? "block" : "none",
          }}
        >
          <h3>No post, write the first?</h3>
        </div>

        <div className="category-items-wrap">
          {filteredCategory.map((allPosts) => (
            <CategoryList
              key={allPosts.id}
              href={`/post/${allPosts.titleurl}`}
              src={`${allPosts.url}`}
              alt={truncateAlt(`${allPosts.title}`)}
              title={truncateTitle(allPosts.title)}
              author={allPosts.author}
              date={allPosts.date}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: filteredCategory.length < 8 ? "250px" : "10px",
          }}
        >
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
