import { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import Footer from "../../components/Footer";
import { request } from "graphql-request";
import { endpoint } from "../../utils/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const EDIT_QUERY = `
query postToEdit($editid: String!) {
      postToEdit(editid: $editid) {
        editid
        title
        description
        author
        titleurl
        authorProfile
        url
      }
    }
`;

export async function getServerSideProps({ params }) {
  const variables = {
    editid: params.id,
  };

  const res = await request(endpoint, EDIT_QUERY, variables);
  const post = await res.postToEdit;

  return {
    props: {
      post,
    },
  };
}

function index({ post }) {
  //  error handling
  const [Modal, setModal] = useState(false);
  const [error, seterror] = useState(false);
  const [disable, setdisable] = useState(false);
  const [content, setContent] = useState("");
  const [url, seturl] = useState("");
  const [authorProfile, setauthorProfile] = useState("");

  const router = useRouter();

  //Text Editor
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    style: {
      fontSize: "16px",
    },
  };

  useEffect(() => {
    setContent(post.description);
    seturl(post.url);
    setauthorProfile(post.authorProfile);
  }, []);

  const EDIT_POST = `
  mutation updatePost(
    $editid: String!
    $description: String!
    $authorProfile: String!
    $url: String!
  ) {
    updatePost(
      editid: $editid
      description: $description
      authorProfile: $authorProfile
      url: $url
    ) {
      editid
      titleurl
    }
  }
`;

  async function handleSubmit(e) {
    e.preventDefault();

    const variables = {
      description: content,
      editid: post.editid,
      authorProfile,
      url
    };
    try {
      setdisable(true);
      await request(endpoint, EDIT_POST, variables);
      setdisable(false);
      setModal(true);
      setContent("");
      await router.push(`/post/${post.titleurl}`);
    } catch (err) {
      seterror(true);
      console.log(err);
      console.log(err.response);
      setdisable(false);
    }
  }

  return (
    <Layout>
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Edit: {post.title} - | Locallog</title>
        </Head>

        <div
          style={{
            display: Modal ? "block" : "none",
            color: "white",
            background: "green",
            padding: "10px 10px",
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            zIndex: "99999",
            textAlign: "center",
          }}
        >
          Your Post Has Been Successfuly Edited!! You Will Now Be Redirected To
          Your Post's Page
        </div>
        <section className="new-post-page">
          <h3 style={{ textAlign: "center" }}>{post.title}</h3>
          <form
            onSubmit={handleSubmit}
            className="new-post-form"
            autoComplete="on"
          >
            <main className="form-wrap-new">
              <section>
                <div className="form-item">
                  <label htmlFor="Article">
                    <h3>Edit Post</h3>
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)}
                  />
                </div>
                <div className="submit-post">
                  <div
                    style={{
                      textAlign: "center",
                      display: disable ? "block" : "none",
                    }}
                  >
                    <img
                      src="/images/spinner.png"
                      alt="spinner"
                      className="spinner"
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      display: error ? "block" : "none",
                    }}
                  >
                    <h3>
                      An error occured, check your internet connection and try
                      again.
                    </h3>
                  </div>
                  <button
                    disabled={disable}
                    type="submit"
                    className="submit-post"
                  >
                    Update
                  </button>
                </div>
              </section>

              <aside>
                <div className="form-item">
                  <label htmlFor="imgUrl">Cover Image URL</label>
                  <input
                    type="url"
                    required
                    placeholder="image url"
                    defaultValue={url}
                    onBlur={(e) => {
                      seturl(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="profile"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "-13px",
                    }}
                  >
                    <h3>Author Profile</h3>
                  </label>
                  <br />
                  <textarea
                    cols="45"
                    rows="5"
                    maxLength="250"
                    name="authorProfile"
                    defaultValue={authorProfile}
                    onBlur={(e) => {
                      setauthorProfile(e.target.value);
                    }}
                    style={{ padding: "15px 10px", width: "100%" }}
                  ></textarea>
                </div>
              </aside>
            </main>
          </form>
        </section>
      </div>
      <br />
      <br />
      <br />
      <Footer />
      <style jsx>{`
        li {
          list-style: square;
        }
        .edit-page {
          margin: auto;
          width: 90%;
        }

        .edit-btn {
          text-align: center;
        }
        .edit-btn button {
          border: none;
          background: none;
          border: 1px solid rgb(62, 82, 163);
          color: white;
          background: rgb(62, 82, 163);
          padding: 10px 20px;
          display: block;
          border-radius: 5px;
          cursor: pointer;
          text-align: center;
        }

        button:focus {
          transform: scale(0.8);
        }

        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </Layout>
  );
}

export default index;
