import { useState } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { useRouter } from "next/router";
import { request } from "graphql-request";
import { dash, endpoint } from "../../utils/utils";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Footer from "../../components/Footer";
import NProgress from "nprogress";

export default function Editorpage() {
  const [Modal, setModal] = useState(false);
  const [error, seterror] = useState(false);
  const [disable, setdisable] = useState(false);

  //Router
  const router = useRouter();

  //Input fields states
  const [title, setTitle] = useState("");
  const [email, setemail] = useState("");
  const [Category, setCategory] = useState("");
  const [author, setauthor] = useState("");
  const [count] = useState(0);
  const [url, seturl] = useState("");
  const [metaDesc, setmetaDesc] = useState("");
  const [authorProfile, setauthorProfile] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  let postLength = stateToHTML(
    convertFromRaw(convertToRaw(description.getCurrentContent()))
  ).length;

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
    let tit = str.trim().replace(/\s+/g, " ");
    tit = tit.split(" ");

    for (var i = 0, x = tit.length; i < x; i++) {
      tit[i] = tit[i][0].toUpperCase() + tit[i].substr(1);
    }
    return tit.join(" ");
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
    if (postLength.length < 400) {
      alert("Post too short");
    } else {
      //DATE
      const dateOptions = { month: "short", day: "numeric", year: "numeric" };
      const today = new Date();
      const date = today.toLocaleDateString("en-US", dateOptions);
      let content = stateToHTML(
        convertFromRaw(convertToRaw(description.getCurrentContent()))
      );
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
        NProgress.start();
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
        setDescription(EditorState.createEmpty());
        setemail("");
        setCategory("");
        setauthor("");
        seturl("");
        setmetaDesc("");
        setauthorProfile("");
        setdisable(false);
        NProgress.done();
        router.push(`/post/${res.addPost.titleurl}`);
      } catch (err) {
        NProgress.done();
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
        <title>New Post | Locallog </title>
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
              <section>
                <div className="form-item">
                  <input
                    type="text"
                    required
                    placeholder="Title..."
                    style={{ fontSize: "1.3rem" }}
                    defaultValue={title}
                    className="title"
                    onBlur={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="Article">
                    <h3>Write Post</h3>
                  </label>
                  <Editor
                    wrapperStyle={{
                      border: "1px 0 0 0 solid rgb(51, 62, 99)",
                      marginBottom: "10px",
                    }}
                    editorStyle={{ minHeight: "90vh", padding: "10px" }}
                    placeholder="Type Something..."
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                      image: {
                        previewImage: true,
                      },
                    }}
                    editorState={description}
                    onEditorStateChange={(editorState) =>
                      setDescription(editorState)
                    }
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
                    Publish
                  </button>
                </div>
              </section>

              <aside>
                <div className="form-item">
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
                    <option defaultValue="Covid-19">Covid-19</option>
                    <option defaultValue="Entertainment">Entertainment</option>
                    <option defaultValue="Politics">Politics</option>
                    <option defaultValue="Technology">Technology</option>
                    <option defaultValue="Lifestyle">Lifestyle</option>
                    <option defaultValue="Personal">Personal</option>
                    <option defaultValue="Health">Health</option>
                    <option defaultValue="Food">Food</option>
                    <option defaultValue="Other">Other</option>
                  </select>
                </div>

                <div className="form-item">
                  <label htmlFor="imgUrl">
                    <h3>Cover Image URL</h3>{" "}
                    <small style={{ fontSize: "0.7rem" }}>
                      Right-click on an image and "copy image address/location",
                      checkout{" "}
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
              </aside>
            </main>
          </form>
        </section>
        <Footer />
        <style jsx>{`
          label h3,
          h2 {
            color: rgb(51, 62, 99);
          }
          textarea {
            line-height: 1.5;
          }
          input {
            border-radius: 5px 5px 0 0;
            background: ghostwhite;
          }
        `}</style>
      </div>
    </Layout>
  );
}
