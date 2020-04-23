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
  ) {
    addPost(
      title: $title
      date: $date
      description: $description
      email: $email
      category: $category
      author: $author
    ) {
      title
      date
      description
      email
      category
      author
    }
  }
`;

export default function New() {
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const router = useRouter();
  const [addPost, { data, error }] = useMutation(ADD_POST);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setdate] = useState("");
  const [email, setemail] = useState("");
  const [category, setcategory] = useState("");
  const [author, setauthor] = useState("");

  // console.log(content);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPost({
        variables: {
          title,
          date,
          description: content,
          email,
          category,
          author,
        },
      });
      setTitle("");
      setContent("");
      setdate("");
      setemail("");
      setcategory("");
      setauthor("");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Head>
        <title>New Post | Tadlace </title>
      </Head>

      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="title">title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="date">date:</label>
            <input
              type="text"
              value={date}
              onChange={(e) => {
                setdate(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="email">email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="category">category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="author">author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setauthor(e.target.value);
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
          <button onClick={onSubmit} type="submit">
            submit
          </button>
        </form>

        <style jsx>
          {`
            .wrapperClassName {
              width: 300px;
            }
          `}
        </style>
      </div>
    </Layout>
  );
}
