import { useState, useRef } from "react";
import dynamic from "next/dynamic";
const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});
import Layout from "../../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_POST = gql`
  mutation addPost(
    $title: String!
    $date: String!
    $description: String!
    $email: String!
    $category: String!
    $author: String!
    $count: Float!
    $url: String!
  ) {
    addPost(
      title: $title
      date: $date
      description: $description
      email: $email
      category: $category
      author: $author
      count: $count
      url: $url
    ) {
      id
      description
      email
      author
      url
    }
  }
`;

export default function New() {
  //Text Editor
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
  };

  //Router
  const router = useRouter();

  //GraphQL query
  const [addPost, { data, error, loading }] = useMutation(ADD_POST);

  //Takes you to the post's page
  if (data) {
    router.push(`/post/${data.addPost.id}`);
  }

  //Input fields states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setemail] = useState("");
  const [Category, setCategory] = useState("");
  const [author, setauthor] = useState("");
  const [count] = useState(0);
  const [url, seturl] = useState("");

  function capital_letter(str) 
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

  const onSubmit = async (e) => {
    e.preventDefault();
    // Prevents short content
    if (content.length < 400) {
      alert("Post too short");
    } else {
      //DATE
      const dateOptions = { month: "short", day: "numeric", year: "numeric" };
      const today = new Date();
      const date = today.toLocaleDateString("en-US", dateOptions);

      try {
        await addPost({
          variables: {
            title: capital_letter(title),
            date,
            description: content,
            email,
            category: `${Category === "" ? "Other" : Category}`,
            author,
            count,
            url,
          },
        });
        setTitle("");
        setContent("");
        setemail("");
        setCategory("");
        setauthor("");
        seturl("");
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <Layout>
      <Head>
        <title>New Post | Tadlace </title>
      </Head>
      <div>
        <section className="new-post-page">
          <form onSubmit={onSubmit} className="new-post-form">
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                required
                placeholder="Title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                value={email}
                required
                placeholder="please enter a valid email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <select
                value={Category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">--select--</option>
                <option value="Business">Business</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Personal">Personal</option>
                <option value="Health % Wellness">Health % Wellness</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                value={author}
                required
                maxLength="20"
                placeholder="Please enter your full name"
                onChange={(e) => {
                  setauthor(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="imgUrl">
                Image URL:(
                <a
                  href="https://pixabay.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  We recommend Pixabay
                </a>
                )
              </label>
              <input
                type="url"
                required
                placeholder="image url"
                value={url}
                onChange={(e) => {
                  seturl(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="Article">
                <h3>Article</h3>
              </label>

              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>
            <button disabled={loading} type="submit">
              submit
            </button>
          </form>
        </section>

        <style jsx>{``}</style>
      </div>
    </Layout>
  );
}
