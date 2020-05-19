import { useState, useRef } from "react";
import dynamic from "next/dynamic";
const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});
import Layout from "../../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import { request } from "graphql-request";
import { dash, endpoint } from "../../utils/utils";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function New() {
  //error handling
  const [Modal, setModal] = useState(false);
  const [error, seterror] = useState(false);
  const [disable, setdisable] = useState(false);

  //Text Editor
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    // uploader: { insertImageAsBase64URI: true },
    saveModeInStorage: true,
    style: {
      fontSize: "16px",
    },
  };

  //Router
  const router = useRouter();

  //Input fields states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setemail] = useState("");
  const [Category, setCategory] = useState("");
  const [author, setauthor] = useState("");
  const [count] = useState(0);
  const [url, seturl] = useState("");
  const [metaDesc, setmetaDesc] = useState("");
  const [authorProfile, setauthorProfile] = useState("");

  async function acknowledgementEmail(title, email, link, author, edit) {
    const payload = {
      title: title,
      email: email,
      link: link,
      author: author,
      edit: edit,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post("/api/acknowledge", payload, config);
    } catch (err) {
      console.log(err.response);
    }
  }

  function capital_letter(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
  }

  //graphql query

  const ADD_POST = `
  mutation addPost(
    $title: String!
    $editid: String!
    $date: String!
    $description: String!
    $email: String!
    $category: String!
    $author: String!
    $count: Float!
    $url: String!
    $metaDesc: String!
    $authorProfile: String!
    $titleurl: String!
  ) {
    addPost(
      title: $title
      editid:$editid
      date: $date
      description: $description
      email: $email
      category: $category
      author: $author
      count: $count
      url: $url
      metaDesc: $metaDesc
      authorProfile: $authorProfile
      titleurl: $titleurl
    ) {
      editid
      titleurl
      description
      email
      author
      url
      title
    }
  }
`;

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

      const variables = {
        title: capital_letter(title),
        editid: uuidv4(),
        titleurl: dash(title),
        date,
        description: content,
        email,
        category: `${Category === "" ? "Other" : Category}`,
        author,
        count,
        url,
        metaDesc,
        authorProfile,
      };

      try {
        seterror(false);
        setdisable(true);
        const res = await request(endpoint, ADD_POST, variables);
        await acknowledgementEmail(
          res.addPost.title,
          res.addPost.email,
          res.addPost.titleurl,
          res.addPost.author,
          res.addPost.editid
        );
        setModal(true);
        setTitle("");
        setContent("");
        setemail("");
        setCategory("");
        setauthor("");
        seturl("");
        setmetaDesc("");
        setauthorProfile("");
        setdisable(false);
        router.push(`/post/${res.addPost.titleurl}`);
      } catch (err) {
        console.log(err.response);
        setdisable(false);
        seterror(true);
        setModal(false);
      }
    }
  };

  return (
    <Layout>
      <Head>
        <title>New Post | Tadlace </title>
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dowrygm9b/image/upload/v1589912401/tadlog/tadlog-logo_bix8vj.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dowrygm9b/image/upload/v1589912401/tadlog/tadlog-logo_bix8vj.png"
        />
      </Head>
      <div>
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
          Your Post Has Been Successfuly Published!! You Will Now Be Redirected
          To Your Post's Page
        </div>
        <section className="new-post-page">
          <form onSubmit={onSubmit} className="new-post-form" autoComplete="on">
            <main className="form-wrap-new">
              <div className="form-item">
                <label htmlFor="title">
                  {" "}
                  <h3>Title</h3>
                </label>
                <input
                  type="text"
                  required
                  placeholder="My Post Title..."
                  defaultValue={title}
                  className="title"
                  onBlur={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="form-item">
                <label htmlFor="email">
                  <h3>Email</h3>
                </label>
                <input
                  type="email"
                  defaultValue={email}
                  required
                  placeholder="Please enter a valid email"
                  onBlur={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <div className="form-item">
                <label htmlFor="category">
                  <h3>Post Category</h3>
                </label>
                <select
                  defaultValue={Category}
                  onBlur={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option defaultValue="">--select--</option>
                  <option defaultValue="Business">Business</option>
                  <option defaultValue="Entertainment">Entertainment</option>
                  <option defaultValue="Politics">Politics</option>
                  <option defaultValue="Technology">Technology</option>
                  <option defaultValue="Lifestyle">Lifestyle</option>
                  <option defaultValue="Personal">Personal</option>
                  <option defaultValue="Health">Health & Wellness</option>
                  <option defaultValue="Food">Food</option>
                  <option defaultValue="Other">Other</option>
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="author">
                  <h3>Author</h3>
                </label>
                <input
                  type="text"
                  defaultValue={author}
                  required
                  maxLength="20"
                  placeholder="Please enter your full name"
                  onBlur={(e) => {
                    setauthor(e.target.value);
                  }}
                />
              </div>
              <div className="form-item">
                <label htmlFor="imgUrl">
                  <h3>Cover Image URL</h3>{" "}
                  <small style={{ fontSize: "0.7rem" }}>
                    Right-click on an image and "copy image address", checkout{" "}
                    <a
                      href="https://pixabay.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "underline" }}
                    >
                      Pixabay
                    </a>{" "}
                    for free stock photos
                  </small>
                </label>
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
                  htmlFor="description"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "-13px",
                  }}
                >
                  <h3>Post Description</h3>
                  <small> (for SEO)</small>
                </label>
                <br />
                <textarea
                  cols="45"
                  rows="5"
                  name="metaDesc"
                  maxLength="350"
                  defaultValue={metaDesc}
                  onBlur={(e) => {
                    setmetaDesc(e.target.value);
                  }}
                  placeholder="Paste a sentence or two from your article"
                  required
                  style={{ padding: "15px 10px", width: "100%" }}
                ></textarea>
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
                  <small style={{ fontSize: "12px" }}> (not required)</small>
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
                  placeholder="A brief profile about you. You could add your social media handles and contact info. (This is displayed publicly under your post)"
                  style={{ padding: "15px 10px", width: "100%" }}
                ></textarea>
              </div>
            </main>
            <div className="form-item">
              <label htmlFor="Article">
                <h2>Write Post</h2>
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
              <button disabled={disable} type="submit" className="submit-post">
                Publish
              </button>
            </div>
          </form>
        </section>
        <Footer />
        <style jsx>{`
          label h3,
          h2 {
            color: rgb(51, 62, 99);
          }
          li {
            list-style: square;
          }
          textarea {
            line-height: 1.5;
          }
        `}</style>
      </div>
    </Layout>
  );
}
