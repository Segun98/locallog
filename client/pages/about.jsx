import React, { useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Footer from "../components/Footer";

export default function About() {
  const [disable, setdisable] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [moreinfo, setMoreinfo] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleMoreinfo(e) {
    setMoreinfo(e.target.value);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setdisable(true);
  //   const payload = {
  //     email: email,
  //     text: `
  //     Name: ${name}

  //     Body: ${moreinfo}`,
  //   };

  //   axios({
  //     url: "/api/mail",
  //     method: "POST",
  //     data: payload,
  //   })
  //     .then((res) => {
  //       console.log(res.data.message);
  //       alert(" " + res.data.message + " ");
  //       setName("");
  //       setEmail("");
  //       setMoreinfo("");
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data.message);
  //     });
  // }

  return (
    <Layout>
      <Head>
        <title>About | Locallog</title>
        <meta
          name="Description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="keywords" content="Publishing, Platform , Locallog" />
        <meta name="author" content="Segun Olanitori" />
        <meta
          property="og:description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="twitter:title" content="Locallog" />
        <meta
          name="twitter:description"
          content="Locallog is an online publishing platform built for people to share their stories, inform and impact the rest of the world, one article at a time"
        />
        <meta name="twitter:card" content="summary" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Locallog" />
        <meta property="og:site_name" content="Locallog" />
        <meta property="article:publisher" content="Segun Olanitori" />
        <meta property="article:author" content="Segun Olanitori" />
      </Head>
      <div className="about-page">
        <h3 style={{ margin: "15px 0", textAlign: "center" }}>
          About Locallog
        </h3>
        <div className="about-page-body">
          <p>
            Locallog is an online publishing platform built for people to share
            their stories, inform and impact the rest of the world, one article
            at a time.
          </p>
          <h4 style={{ textAlign: "center", margin:"5px 0" }}>What You Get on Locallog</h4>
          <ul>
            <li>Write articles quickly and easily without having to sign up</li>
            <li>
              Full control - Your articles are published exactly how you write
              them; no ads in between, all stylings are the same.
            </li>
            <li>Rich Text-Editor (jodit) - Use keyboard shortcuts on texts and more </li>
            <li>
              Aggregate your articles by searching by your name in the search
              box
            </li>
            <li>Search Engine Optimization</li>
          </ul>
          <br />
          <div id="contact">
            <h4 style={{ textAlign: "center" }}>
              For further assistance, Contact US
            </h4>

            <form autoComplete="on">
              <div>
                <label htmlFor="Name">Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name..."
                  required
                  value={name}
                  onChange={handleName}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="example@email.com"
                  autoComplete="on"
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <div>
                <label htmlFor="info">Body</label>
                <br />
                <textarea
                  cols="45"
                  rows="12"
                  value={moreinfo}
                  onChange={handleMoreinfo}
                  placeholder="Start typing..."
                  required
                  style={{ padding: "15px 10px", width: "100%" }}
                ></textarea>
              </div>
              <div style={{ textAlign: "center" }}>
                <button disabled={disable} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <br/>
        <Footer />
        <style jsx>
          {`
            .about-page-body {
              margin: auto;
              width: 90%;
              text-align: justify;
            }

            ul li {
              list-style: circle;
              line-height: 1.5
            }
            form div {
              margin-top: 5px;
            }
            input {
              width: 100%;
              padding: 10px;
            }
            button{
              padding: 10px 20px;
              background: #333;
              color: white;
              border: none;
              margin-bottom: 10px
            }
            @media only screen and (min-width: 600px) {
              .about-page-body {
                width: 60%;
              }
            }

            @media only screen and (min-width: 1300px) {
              .about-page-body {
                width: 50%;
              }
            }
          `}
        </style>
      </div>
    </Layout>
  );
}
